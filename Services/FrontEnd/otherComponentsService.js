const fs = require("fs");
var path = require("path");
const CRUDConfigurations = require("../../CRUD_Config");

let instance = null;

class otherComponentsService {
  constructor() {}

  static getInstance() {
    if (!instance) {
      instance = new otherComponentsService();
    }
    return instance;
  }

  generateComponentFile(folderPath, fileName) {
    try {
      let filePath =
        __dirname + "../../../"+ CRUDConfigurations.reactAppCodeFolderName +"/components/" + fileName + ".txt";
      
        let componentCode = fs.readFileSync(path.resolve(filePath), "utf8");
      let fileNameWithExt = fileName + ".jsx";

      fs.writeFile(folderPath + "/" + fileNameWithExt, componentCode, err => {
        if (err) {
          console.log(err);
        } else {
          //console.log("Sccessfully created " + fileNameWithExt + " file");
        }
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = otherComponentsService;
