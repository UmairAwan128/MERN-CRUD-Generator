const fs = require("fs");
var path = require("path");
const CRUDConfigurations = require("../../CRUD_Config");

let instance = null;

class authFilesService {
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new authFilesService();
    }
    return instance;
  }

  generateAuthFile( codeFolderPath, destFolderPath, fileName, fileExtension) {
    try {
      let filePath = __dirname + "../../../"+ CRUDConfigurations.NodeAppCodeFolderName + codeFolderPath + fileName + ".txt";

      let Code = fs.readFileSync(path.resolve(filePath), "utf8");
      let fileNameWithExt = "";
      fileNameWithExt += fileName + fileExtension;

      //now create the file and write the code inside it
      fs.writeFile(destFolderPath + "/" + fileNameWithExt, Code, err => {
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

module.exports = authFilesService;
