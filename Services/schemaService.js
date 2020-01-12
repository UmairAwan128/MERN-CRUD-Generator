const fs = require("fs");
const path = require("path");
var zipFolder = require('zip-a-folder');
const rimraf = require('rimraf');  //for deleting old output project folder content
const CRUDConfigurations = require("../CRUD_Config");
const CRUDGeneratorService = require("./CRUDGeneratorService");

const outputFolderpath = path.join(__dirname, '../') +"\output\\";

let instance = null;
let CRUDGeneratorServiceObj = null;

class schemaService {
    constructor() {
        CRUDGeneratorServiceObj = CRUDGeneratorService.getInstance();
    }

    static getInstance() {
      if (!instance) {
        instance = new schemaService();
      }
      return instance;
    }
  
    generateCRUDApp(scheemaJson, outputFolderpath) 
    {
        try{
            var schemaValidationErrors = CRUDGeneratorServiceObj.validateScheema(scheemaJson);
            if(schemaValidationErrors == ""){ //if the scheema is in valid format so there will be no errors                
                //console.log(scheemaJson);
                //create new CRUD
                let isCRUDGenerated = CRUDGeneratorServiceObj.generateCRUD(scheemaJson, outputFolderpath);
                if (!isCRUDGenerated) {
                  //console.log("Some Files Failed to Generate.");
                }
                zipFolder.zipFolder(
                outputFolderpath +"\\output\\"+ CRUDConfigurations.ProjectFolderName,
                outputFolderpath + "\\output\\" + CRUDConfigurations.ProjectFolderName+ ".zip", 
                function(err) { 
                    if(err) {
                        console.log('Some thing went wrong while making Zip of your project', err);
                    }
                    else {
                        console.log('Your project is ready and is created at :\n\t'+ outputFolderpath +"\\output\\");
                    }
                });
                   
            }
            else{
                console.log("Scheema Validation Failed because of following reasons :\n"+ schemaValidationErrors);
            }
        }
        catch(ex){
          console.log(ex.message);
        }
    }

    generateAdminPannel(outputFolderpath) 
    {
        try{
            var scheemaString = "{}"; //passed empty scheema object
            //create new CRUD as in this case scheema is empty so will return admin pannel only
            let isCRUDGenerated = CRUDGeneratorServiceObj.generateCRUD(scheemaString,outputFolderpath);
            if (!isCRUDGenerated) {
                console.log("Some Files Failed to Generate.");
            }
            zipFolder.zipFolder(
            outputFolderpath + "\\output\\" + CRUDConfigurations.ProjectFolderName,
            outputFolderpath + "\\output\\" + CRUDConfigurations.ProjectFolderName+ ".zip", 
            function(err) { 
                if(err) {
                    console.log('Some thing went wrong while making Zip of your project', err);
                }
                else {
                    console.log('Your project is ready and is created at :\n\t'+ outputFolderpath +"\\output\\");      
                }
            });         
        }
        catch(ex){
            console.log(ex.message);
        }
    }

    removeOldProject()
    {
        rimraf( outputFolderpath+'/*' , function () { console.log('old project removed.'); });
        res.send("Project Successfully removed.");
    }

}

module.exports = schemaService;





