const fs = require("fs");
const path = require("path");
var zipFolder = require('zip-a-folder');
const rimraf = require('rimraf');  //for deleting old output project folder content
const CRUDConfigurations = require("../CRUD_Config");
const CRUDGeneratorService = require("./CRUDGeneratorService");

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
  
    generateCRUDApp(scheemaJson, outputFolderpath,onlyNodeApp) 
    {
        try{
            var schemaValidationErrors = CRUDGeneratorServiceObj.validateScheema(scheemaJson);
            if(schemaValidationErrors == ""){ //if the scheema is in valid format so there will be no errors                
                //console.log(scheemaJson);
                //create new CRUD
                let isCRUDGenerated = CRUDGeneratorServiceObj.generateCRUD(scheemaJson, outputFolderpath,onlyNodeApp);
                if (!isCRUDGenerated) {
                  //console.log("Some Files Failed to Generate.");
                }
                zipFolder.zipFolder(
                outputFolderpath +"\\AppGenerated\\"+ CRUDConfigurations.ProjectFolderName,
                outputFolderpath + "\\AppGenerated\\" + CRUDConfigurations.ProjectFolderName+ ".zip", 
                function(err) { 
                    if(err) {
                        console.log('\nSome thing went wrong while making Zip of your project deatils regarding errors are wrote to the file in the follwing location:');
                        instance.createErrorsFile(outputFolderpath,err);
                    }
                    else {
                        console.log('\nYour project is ready and is created at :\n\t'+ outputFolderpath +"\\AppGenerated\\");
                        instance.removeErrorsFile(outputFolderpath);      
                    }
                });
                   
            }
            else{
                console.log('\nSchema provided is not valid, deatils regarding errors are wrote to the file in the follwing location:');
                this.createErrorsFile(outputFolderpath, "Schema Validation Failed because of following reasons :\n"+ schemaValidationErrors);
            }
        }
        catch(ex){
           console.log('\nAn Expeption Occur while generating project, deatils regarding exception are wrote to the file in the follwing location:');
           this.createErrorsFile(outputFolderpath,"\nAn Expeption Occur while generating project\n : "+ex);
        }
    }

    generateAdminPannel(outputFolderpath) 
    {
        try{
            const onlyNodeApp = false;
            var scheemaString = "{}"; //passed empty scheema object
            //create new CRUD as in this case scheema is empty so will return admin pannel only
            let isCRUDGenerated = CRUDGeneratorServiceObj.generateCRUD(scheemaString,outputFolderpath,onlyNodeApp);
            if (!isCRUDGenerated) {
                console.log("\nSome Files Failed to Generate.");
            }
            zipFolder.zipFolder(
            outputFolderpath + "\\AppGenerated\\" + CRUDConfigurations.ProjectFolderName,
            outputFolderpath + "\\AppGenerated\\" + CRUDConfigurations.ProjectFolderName+ ".zip", 
            function(err) { 
                if(err) {
                    console.log('\nSome thing went wrong while making Zip of your project deatils regarding errors are wrote to the file in the follwing location:');
                    instance.createErrorsFile(outputFolderpath,err);
                }
                else {
                    console.log('\nYour project is ready and is created at :\n'+ outputFolderpath +"\\AppGenerated\\");
                    instance.removeErrorsFile(outputFolderpath);
                }
            });         
        }
        catch(ex){
            console.log('\nAn Expeption Occur while generating project, deatils regarding exception are wrote to the file in the follwing location:');
            this.createErrorsFile(outputFolderpath,"\nAn Expeption Occur while generating project\n : "+ex);
        }
    }

    // removeOldProject()
    // {
    //     rimraf( outputFolderpath+'/*' , function () { console.log('old project removed.'); });
    //     console.log("Project Successfully removed.");
    // }

    removeErrorsFile(outputFolderpath){
        const fileName = "errors.txt";
        const filePath = outputFolderpath + "/" + fileName;
        if(fs.existsSync(filePath)){ //if file exists
            fs.unlinkSync(filePath); //remove it
        }
    }
    
    createErrorsFile(outputFolderpath,errors){
       const fileName = "errors.txt";
       console.log('\t'+outputFolderpath+'\\'+fileName);               
        fs.writeFile(outputFolderpath + "/" + fileName, errors, err => {
          if (err) {
            console.log(err);
          }
        });
    }
}

module.exports = schemaService;





