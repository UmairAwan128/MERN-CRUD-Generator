const fs = require("fs");
var path = require("path");
const CRUDConfigurations = require("../../CRUD_Config");

let instance = null;

class utilsFolderFilesService {
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new utilsFolderFilesService();
    }
    return instance;
  }

  generateUtilFile(folderPath, fileName) {
    try {
      var filePath = __dirname + "../../../"+ CRUDConfigurations.reactAppCodeFolderName +"/utils/" + fileName + ".txt";
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
}

module.exports = utilsFolderFilesService;
