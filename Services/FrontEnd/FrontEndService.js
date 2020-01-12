const fs = require("fs");

const appFileService = require("./appFile/appFileService");
const tableService = require("./components/table/tableServices");
const formsService = require("./components/forms/formsService");
const detailsService = require("./components/details/detailsService");
const srcFilesService = require("./srcFilesService");
const cssFileService = require("./cssFileService");
const serviceFolderFilesGeneratorService = require("./services/serviceFolderFilesGeneratorService");
const utilsFolderFilesServiceService = require("./utilsFolderFilesService");
const publicService = require("./publicFilesServices");
const mainFolderFilesService = require("./mainFolderFilesService");
const otherComponentsService = require("./components/otherComponentsService");
const navbarComponentsService = require("./components/navbar/navbarFileService");
const packageFileService = require("./packageFile/packageService");

let instance = null;
let appFileServiceObj = null;
let tblServiceObj = null;
let formServiceObj = null;
let detailsServiceObj = null;
let srcFilesServiceObj = null;
let cssFileServiceObj = null;
let serviceFolderFilesGeneratorObj = null;
let utilsFolderFilesServiceServiceobj = null;
let publicServiceObj = null;
let mainFolderServiceObj = null;
let otherComponentsServiceObj = null;
let navbarComponentsServiceObj = null;
let packageFileServiceObj = null;

class FrontEndService {
  constructor() {
    appFileServiceObj = appFileService.getInstance();
    tblServiceObj = tableService.getInstance();
    formServiceObj = formsService.getInstance();
    srcFilesServiceObj = srcFilesService.getInstance();
    cssFileServiceObj = cssFileService.getInstance();
    serviceFolderFilesGeneratorObj = serviceFolderFilesGeneratorService.getInstance();
    publicServiceObj = publicService.getInstance();
    mainFolderServiceObj = mainFolderFilesService.getInstance();
    navbarComponentsServiceObj = navbarComponentsService.getInstance();
    otherComponentsServiceObj = otherComponentsService.getInstance();
    utilsFolderFilesServiceServiceobj = utilsFolderFilesServiceService.getInstance();
    packageFileServiceObj = packageFileService.getInstance();
    detailsServiceObj = detailsService.getInstance();
  }

  static getInstance() {
    if (!instance) {
      instance = new FrontEndService();
    }
    return instance;
  }

  generateFrontEnd(scheema, projectFolderPath) {
    try {
        let FilesGenerated = true;
        //.....................CRUD Releated Folder.....................................
        
        //.............create Project folder if not exist
        if (!fs.existsSync(projectFolderPath)) {
          fs.mkdirSync(projectFolderPath);
        }

        //.............create the src folder
        let srcFolderPath = projectFolderPath + "/src";
        if (!fs.existsSync(srcFolderPath)) {
          fs.mkdirSync(srcFolderPath);
        }
        //.............create the services folder
        let serviceFolderPath = srcFolderPath + "/services";
        if (!fs.existsSync(serviceFolderPath)) {
          fs.mkdirSync(serviceFolderPath);
        }
        //.............create the components folder
        let componentsFolderPath = srcFolderPath + "/components";
        if (!fs.existsSync(componentsFolderPath)) {
          fs.mkdirSync(componentsFolderPath);
        }

        
        //.....................Other Folders.....................................
        
        //.............create the public folder
        let publicFolderPath = projectFolderPath + "/public";
        if (!fs.existsSync(publicFolderPath)) {
          fs.mkdirSync(publicFolderPath);
        }
        //.............create the utils folder
        let utilsFolderPath = srcFolderPath + "/utils";
        if (!fs.existsSync(utilsFolderPath)) {
          fs.mkdirSync(utilsFolderPath);
        }
        //.............create the common components folder
        let commonComponentsFolderPath = componentsFolderPath + "/common";
        if (!fs.existsSync(commonComponentsFolderPath)) {
          fs.mkdirSync(commonComponentsFolderPath);
        }


        //.......................Other Files........................................
        
        //...................Main/project folder files
        FilesGenerated = packageFileServiceObj.generatePackageFile(
          projectFolderPath,
          "package",
          ".json"
        );
        FilesGenerated = mainFolderServiceObj.generateMainFolderFile(
          projectFolderPath,
          "README",
          ".md"
        );
        //....................components files
        FilesGenerated = otherComponentsServiceObj.generateComponentFile(
          componentsFolderPath,
          "loginForm"
        );
        FilesGenerated = otherComponentsServiceObj.generateComponentFile(
          componentsFolderPath,
          "logout"
        );
        FilesGenerated = otherComponentsServiceObj.generateComponentFile(
          componentsFolderPath,
          "notFound"
        );
        FilesGenerated = otherComponentsServiceObj.generateComponentFile(
          commonComponentsFolderPath,
          "Pagination"
        );
        FilesGenerated = otherComponentsServiceObj.generateComponentFile(
          componentsFolderPath,
          "passwordResetForm"
        );
        FilesGenerated = otherComponentsServiceObj.generateComponentFile(
          componentsFolderPath,
          "profileForm"
        );
        FilesGenerated = otherComponentsServiceObj.generateComponentFile(
          componentsFolderPath,
          "registerForm"
        );
        //.........................src folder files
        FilesGenerated = srcFilesServiceObj.generateSrcFolderFile(
          srcFolderPath,
          "App",
          ".css",
          "AppCss"
        );
        FilesGenerated = srcFilesServiceObj.generateSrcFolderFile(
          srcFolderPath,
          "App.test",
          ".js"
        );
        FilesGenerated = cssFileServiceObj.generateCssFile(
          srcFolderPath,
          "index",
          ".css"
        );
        FilesGenerated = srcFilesServiceObj.generateSrcFolderFile(
          srcFolderPath,
          "index",
          ".js",
          "indexJs"
        );
        FilesGenerated = srcFilesServiceObj.generateSrcFolderFile(
          srcFolderPath,
          "logo",
          ".svg"
        );
        FilesGenerated = srcFilesServiceObj.generateSrcFolderFile(
          srcFolderPath,
          "serviceWorker",
          ".js"
        );
        FilesGenerated = srcFilesServiceObj.generateSrcFolderFile(
          srcFolderPath,
          "CRUDAppConfigs",
          ".json"
        );
        //.......................Services folder files
        FilesGenerated = serviceFolderFilesGeneratorObj.generateServiceFile(
          serviceFolderPath,
          "authService"
        );
        FilesGenerated = serviceFolderFilesGeneratorObj.generateServiceFile(
          serviceFolderPath,
          "httpService"
        );
        FilesGenerated = serviceFolderFilesGeneratorObj.generateServiceFile(
          serviceFolderPath,
          "userService"
        );
        //public folder files...................................................
        FilesGenerated = publicServiceObj.generatePublicFolderFile(
          publicFolderPath,
          "index",
          ".html"
        );
        FilesGenerated = publicServiceObj.GenerateFaviconFile(publicFolderPath);
        FilesGenerated = publicServiceObj.generatePublicFolderFile(
          publicFolderPath,
          "manifest",
          ".json"
        );
        //utils folder files..................................................
        FilesGenerated = utilsFolderFilesServiceServiceobj.generateUtilFile(
          utilsFolderPath,
          "paginate"
        );

        
       //..............................CRUD Releated Files........................................
       
       //.......1.Common CRUD Files...............
       
       //.......................src folder files
       
       FilesGenerated = appFileServiceObj.generateAppFile(scheema, srcFolderPath, "App.js") 
       
       //.......................component folder files
       
       FilesGenerated = navbarComponentsServiceObj.generateNavbarFile(
        scheema,
        componentsFolderPath,
        "navbar.jsx"
       );
       

       //.......2. CRUD Files...............

       if(scheema.length == 0){ //if scheema passed is empty array this means user wants only auth files so return 
        //don,t go for the crud files but generate a sample compoent.
          FilesGenerated = otherComponentsServiceObj.generateComponentFile(
            componentsFolderPath,
            "sampleComponent"
          );
          return FilesGenerated;
       }

       for (var tableId in scheema) {
          
          let tblName = scheema[tableId].tableName; 
          
          FilesGenerated = tblServiceObj.generateTblCRUDFile(
            scheema[tableId],
            componentsFolderPath,
          );
          
          FilesGenerated = formServiceObj.generateFormCRUDFile(
            scheema[tableId],
            componentsFolderPath
          );

          FilesGenerated = detailsServiceObj.generateDetailsCRUDFile(
            scheema[tableId],
            componentsFolderPath
          );

          //......................Services folder files
          
          FilesGenerated = serviceFolderFilesGeneratorObj.generateScheemaServiceFile(
          tblName,
          serviceFolderPath,        
          );

      }
      return FilesGenerated;
    
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = FrontEndService;
