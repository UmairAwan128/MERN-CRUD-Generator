const express = require("express");
const router = express.Router(); 
const fs = require("fs");
const path = require("path");
var zipFolder = require('zip-a-folder');
const rimraf = require('rimraf');  //for deleting old output project folder content
const CRUDConfigurations = require("../CRUD_Config");
const CRUDGeneratorService = require("../Services/CRUDGeneratorService");

const scheemaFilePath = __dirname + "../../scheema.json";
const outputFolderpath = path.join(__dirname, '../') +'\output\\';
            
const CRUDGeneratorServiceObj = CRUDGeneratorService.getInstance();
   
router.get("/", (req, res) => {
  fs.readFile( scheemaFilePath, "utf8", (err, data) => {
    if (err) {
      res.send(err);
    }  
    const dataParsed = JSON.parse(data);
    res.send(dataParsed);
  });
});

router.post("/", async (req, res) => {
  try{
    var scheemaJson = req.body;
    const projPathHeadr = req.headers['project-path']; // if passed in header with value true means return path of output project not zip 
    var schemaValidationErrors = CRUDGeneratorServiceObj.validateScheema(scheemaJson);
    if(schemaValidationErrors == ""){ //if the scheema is in valid format so there will be no errors                
        console.log("Scheema Validated Successfully.");
        //console.log(scheemaJson);
        var scheemaString = JSON.stringify(req.body);
        fs.writeFile( scheemaFilePath, scheemaString ,function (err) {
          if (err) {
            res.send(eryr);
          }
          else{
            //create new CRUD
            let isCRUDGenerated = CRUDGeneratorServiceObj.generateCRUD();
            if (!isCRUDGenerated) {
              console.log("Some Files Failed to Generate.");
            }
            if(projPathHeadr == "true"){ // if project-path header passed with value true means return path of output project not zip 
              let paths = [];
              paths[0] =  req.get('host') + '/api/project/accessFiles/' + CRUDConfigurations.ProjectFolderName;
              paths[1] =  req.get('host') + '/api/project/accessFiles/' + CRUDConfigurations.ProjectFolderName + '/' + CRUDConfigurations.ReactProjectFolderName;
              paths[2] =  req.get('host') + '/api/project/accessFiles/' + CRUDConfigurations.ProjectFolderName + '/' + CRUDConfigurations.NodeProjectFolderName; 
              res.send(paths.join('\n').toString());
            }
            else{
              zipFolder.zipFolder(
                outputFolderpath + "\\" + CRUDConfigurations.ProjectFolderName,
                outputFolderpath + "\\" + CRUDConfigurations.ProjectFolderName+ ".zip", 
                function(err) { 
                  if(err) {
                      console.log('Some thing went wrong while making Zip of your project', err);
                  }
                  else {
                      console.log('Your project is Zipped and Ready to download.');
                      res.download(outputFolderpath +"/" + CRUDConfigurations.ProjectFolderName+ ".zip");
                      // //(woking fine) remove the generated CRUD so for the next time when CRUD generates output folder is empty
                      // rimraf( outputFolderpath+'/*', function () { console.log('old project removed.'); });
                      // console.log("Project Successfully removed.");
                  }
              });
             
            }
          } 
        });   
      }
      else{
        console.log("Scheema Validation Failed because of following reasons :\n"+ schemaValidationErrors);
        res.status(400).send("Scheema Validation Failed because of following reasons :\n"+ schemaValidationErrors);
      }
    }
    catch(ex){
      res.send(ex.message);
    }
  });

module.exports = router;