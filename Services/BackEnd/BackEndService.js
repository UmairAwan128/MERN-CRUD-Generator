const fs = require("fs");

const appFileService = require("./appFile/appFileService");
const modelService = require("./models/modelsService");
const routeService = require("./routes/routesService");
const packageFileService = require("./packageFile/packageService");
const authFilesService = require("./authFilesService");
const sampleRecordService = require("./sampleRecord/sampleRecordService");
const configService = require("./configFile/configService");

let instance = null;
let appFileServiceObj = null;
let modelServiceObj = null;
let routeServiceObj = null;
let packageFileServiceObj = null;
let sampleRecordServiceObj = null;
let authFilesServiceObj = null;
let configServiceObj = null;

class BackEndService {
  constructor() {
    appFileServiceObj = appFileService.getInstance();
    modelServiceObj = modelService.getInstance();
    routeServiceObj = routeService.getInstance();
    packageFileServiceObj = packageFileService.getInstance();
    authFilesServiceObj = authFilesService.getInstance();
    sampleRecordServiceObj = sampleRecordService.getInstance();
    configServiceObj = configService.getInstance();
  }

  static getInstance() {
    if (!instance) {
      instance = new BackEndService();
    }
    return instance;
  }

  generateBackend(scheema, folderName) {
  
    try {
      let FilesGenerated = true;
      //....................CRUD Releated Folders................
      //create Project folder if not exist
      let projectFolderPath = "./" + folderName;
      if (!fs.existsSync(projectFolderPath)) {
        fs.mkdirSync(projectFolderPath);
      }
      //create the models folder
      let modelsFolderPath = "./" + folderName + "/models";
      if (!fs.existsSync(modelsFolderPath)) {
        fs.mkdirSync(modelsFolderPath);
      }
      //create the routes folder
      let routuesFolderPath = "./" + folderName + "/routes";
      if (!fs.existsSync(routuesFolderPath)) {
        fs.mkdirSync(routuesFolderPath);
      }
      
      //...........................................Other Folders..........................................
      
      //create the services folder
      let serviceFolderPath = "./" + folderName + "/services";
      if (!fs.existsSync(serviceFolderPath)) {
        fs.mkdirSync(serviceFolderPath);
      }
      //.............Other files
      //User Authentication Files
      FilesGenerated = authFilesServiceObj.generateAuthFile("/models/", modelsFolderPath, "User", ".js");
      FilesGenerated = authFilesServiceObj.generateAuthFile("/routes/", routuesFolderPath, "auth", ".js");
      FilesGenerated = authFilesServiceObj.generateAuthFile("/routes/", routuesFolderPath, "verifyToken", ".js");
      FilesGenerated = authFilesServiceObj.generateAuthFile("/", serviceFolderPath, "validation", ".js");
      //Main/project folder files
      FilesGenerated = packageFileServiceObj.generatePackageFile(
        projectFolderPath,
        "package",
        ".json"
      );
      FilesGenerated = configServiceObj.generateConfigurations(
        projectFolderPath,
        "config",
        ".js"
      );

      //.................................CRUD Files....................................................................

      //.......1.Common CRUD Files...............
      FilesGenerated = appFileServiceObj.generateAppFile(scheema, projectFolderPath, "app.js"); 
      FilesGenerated = sampleRecordServiceObj.generateSampleRecordFile(scheema, serviceFolderPath, "sampleRecord.js");

      //.......2.CRUD Files...............
      if(scheema.length == 0){ //if scheema passed is empty array this means user wants only auth files so return 
        //don,t go for the crud files
        return FilesGenerated;
       }
 
      for (var tableId in scheema) {
        FilesGenerated = modelServiceObj.generateModel(scheema[tableId], modelsFolderPath);
        FilesGenerated = routeServiceObj.generateRouteFile(scheema[tableId], routuesFolderPath);
      }      

      return FilesGenerated;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = BackEndService;
