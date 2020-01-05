const express = require("express");
const router = express.Router(); 
const path = require("path");
const rimraf = require('rimraf');  //for deleting old output project folder content
const CRUDConfigurations = require("../CRUD_Config");
const fs = require("fs");
const scheemaFilePath = __dirname + "../../scheema.json";
const CRUDGeneratorService = require("../Services/CRUDGeneratorService");

// //stand alone endpoint to access a specific folder files also inner folders content it is a middleware
//e.g:   http://localhost:4000/api/output/sampleApp/sampleNodeApp/app.js
//app.use(express.static( path.join(__dirname, 'output') , {index:false,extensions:['html']} ) );
router.use('/accessFiles', express.static( path.join(__dirname, '../') + '\output' ,{index:false}) , function(req, res){  //  api/myFile.txt
    // Optional 404 handler
    res.status(404);
    res.json("The file you requested is not found on the Server.")
});

// // it show zip file in txt like format in browser
// //stand alone endpoint to access a specific folder files not inner folders content no noeed of any middleware
// //app.get('/output/:file', (req, res) => { //generic for access any file inside folder pass name with ext
// router.get('/output/getProject', (req, res) => { //gives output project zip file in bu=ytes array format
//     fs.readFile( __dirname +'/output/sampleApp'+".zip", 'utf8', function (err, data) { //if wana fix file and extension
//     //fs.readFile( __dirname +'/output/' + req.params.file, 'utf8', function (err, data) {
//       var bytesArr = new Buffer.fom(data);
//       // fs.writeFile("./test1.zip", bytesArr, function(err){
//       //   res.status(500).send(err);
//       // });
//        res.status(200).send(bytesArr);
//       //res.end( data );
//   });
// });

const outputFolderpath = path.join(__dirname, '../') +'\output\\';
const CRUDGeneratorServiceObj = CRUDGeneratorService.getInstance();
   

//get the project and instantly remove the output folder content
router.get("/get", async (req, res) => {
  try{
        res.download(outputFolderpath +"/" + CRUDConfigurations.ProjectFolderName+ ".zip");
        //remove the generated CRUD so for the next time when CRUD generates its empty
        // rimraf( './output/*', function () { console.log('old project removed.'); });
        // console.log("Project Successfully removed.");
  }
  catch(ex){
     res.send(ex.message);
  }
});

router.get("/remove", (req, res) => {
  rimraf( outputFolderpath+'/*' , function () { console.log('old project removed.'); });
  res.send("Project Successfully removed.");
});

//get admin pannel not any crud so scheema will null this time
router.get("/getAdminPannel", async (req, res) => {
  try{
    const projPathHeadr = req.headers['project-path']; // if passed in header with value true means return path of output project not zip 
    var scheemaString = "{}"; //passed empty scheema object
    fs.writeFile( scheemaFilePath, scheemaString ,function (err) {
      if (err) {
        res.send(eryr);
      }
      else{
        //create new CRUD as in this case scheema is empty so will return admin pannel only
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
  catch(ex){
     res.send(ex.message);
  }
});

module.exports = router;