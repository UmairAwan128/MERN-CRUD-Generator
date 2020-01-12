const fs = require("fs");
var path = require("path");
const CRUDConfigurations = require("../../../CRUD_Config");
const servicesFolderCodeService = require("./servicesFolderCodeService");

let instance = null;
let servicesFolderCodeServiceInst = null;

class serviceFolderFilesGeneratorService {
  constructor() {
    servicesFolderCodeServiceInst = servicesFolderCodeService.getInstance();
  } //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new serviceFolderFilesGeneratorService();
    }
    return instance;
  }

  generateServiceFile(folderPath, fileName) {
    try {
      var filePath = __dirname + "../../../../"+ CRUDConfigurations.reactAppCodeFolderName +"/services/" + fileName + ".txt";
      var httpServiceCode = fs.readFileSync(path.resolve(filePath), "utf8");

      //now create the file and write the code inside it
      fs.writeFile(
        folderPath + "/" + fileName + ".js",
        httpServiceCode,
        err => {
          if (err) {
            console.log(err);
          } else {
            //console.log("Sccessfully created " + fileName + " file. ");
          }
        }
      );
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  generateScheemaServiceFile(tblName, folderPath) {
    try {
      let fileName = tblName.toLowerCase() + "Service.js";
      let Code = servicesFolderCodeServiceInst.GetScheemaServiceCode(tblName); //generate table code
      //now create the file and write the code inside it
      fs.writeFile(folderPath + "/" + fileName, Code, err => {
        if (err) {
          console.log(err);
        } else {
          //console.log("Sccessfully created " + fileName + " file");
        }
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

}

module.exports = serviceFolderFilesGeneratorService;
