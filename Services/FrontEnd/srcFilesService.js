const fs = require("fs");
var path = require("path");
const CRUDConfigurations = require("../../CRUD_Config");

let instance = null;

class srcFilesService {
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new srcFilesService();
    }
    return instance;
  }

  generateSrcFolderFile(folderPath, fileName, fileExtention, fileToRead = "") {
    try {
      //if fileToRead is not passed that mean fileToRead and file we want to create has the same name
      if (fileToRead == "") {
        fileToRead = fileName;
      }

      let filePath = __dirname + "../../../"+ CRUDConfigurations.reactAppCodeFolderName +"/src/" + fileToRead + ".txt";
      let configCode = fs.readFileSync(path.resolve(filePath), "utf8");
      let fileNameWithExt = fileName + fileExtention;
      //now create the file and write the code inside it
      fs.writeFile(folderPath + "/" + fileNameWithExt, configCode, err => {
        if (err) {
          console.log(err);
        } else {
          console.log("Sccessfully created " + fileNameWithExt + " file. ");
        }
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = srcFilesService;
