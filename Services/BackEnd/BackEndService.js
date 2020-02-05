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

  generateBackend(scheema, projectFolderPath) {
  
    try {
      let FilesGenerated = true;
      //....................CRUD Releated Folders................
      //create Project folder if not exist
      if (!fs.existsSync(projectFolderPath)) {
        fs.mkdirSync(projectFolderPath);
      }
      //create the models folder
      let modelsFolderPath = projectFolderPath + "/models";
      if (!fs.existsSync(modelsFolderPath)) {
        fs.mkdirSync(modelsFolderPath);
      }
      //create the routes folder
      let routuesFolderPath = projectFolderPath + "/routes";
      if (!fs.existsSync(routuesFolderPath)) {
        fs.mkdirSync(routuesFolderPath);
      }
      
      //...........................................Other Folders..........................................
      
      //create the services folder
      let serviceFolderPath = projectFolderPath + "/services";
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
      
      FilesGenerated = sampleRecordServiceObj.generateSampleRecordFile(serviceFolderPath, "sampleRecord.js");

      //.................................CRUD Files....................................................................

      var schemaTables = null; 
      var schemaRelations = null;
      if(scheema.hasOwnProperty('tables')){ //as relations is a optional property
        schemaTables = scheema.tables; 
      }
      if(scheema.hasOwnProperty('relations')){ //as relations is a optional property
        schemaRelations = scheema.relations; 
      }
      //.......1.Common CRUD Files...............
      FilesGenerated = appFileServiceObj.generateAppFile(schemaTables, projectFolderPath, "app.js"); 
      
      //.......2.CRUD Files...............
      if(scheema == {}){ //if scheema passed is empty array this means user wants only auth files so return 
        //don,t go for the crud files
        return FilesGenerated;
      }

       
       for (var tableId in schemaTables) {
        FilesGenerated = modelServiceObj.generateModel(schemaTables[tableId],schemaTables,schemaRelations, modelsFolderPath);
        FilesGenerated = routeServiceObj.generateRouteFile(schemaTables[tableId],schemaRelations, routuesFolderPath);
      }      

      return FilesGenerated;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = BackEndService;
