const fs = require("fs");
var path = require("path");
const CRUDConfigurations = require("../../CRUD_Config");

let instance = null;

class mainFolderFilesService {
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new mainFolderFilesService();
    }
    return instance;
  }

  generateMainFolderFile(folderPath, fileName, fileExtension) {
    try {
      let filePath = __dirname + "../../../"+ CRUDConfigurations.reactAppCodeFolderName + "/" + fileName + ".txt";

      let Code = fs.readFileSync(path.resolve(filePath), "utf8");
      let fileNameWithExt = fileName + fileExtension;
      //now create the file and write the code inside it
      fs.writeFile(folderPath + "/" + fileNameWithExt, Code, err => {
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

module.exports = mainFolderFilesService;
