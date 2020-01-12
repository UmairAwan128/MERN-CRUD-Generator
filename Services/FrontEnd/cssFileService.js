const fs = require("fs");
var path = require("path");
const CRUDConfigurations = require("../../CRUD_Config");

let instance = null;

class cssFilesService {
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new cssFilesService();
    }
    return instance;
  }

  generateCssFile(folderPath, fileName, fileExtention) {
    try {
      //if fileToRead is not passed that mean fileToRead and file we want to create has the same name
      const fileToRead = CRUDConfigurations.ProjectThemeName;
      
      let filePath = __dirname + "../../../"+ CRUDConfigurations.reactAppCodeFolderName +"/src/cssFiles/" + fileToRead + ".txt";
      let cssFileCode = fs.readFileSync(path.resolve(filePath), "utf8");
      let fileNameWithExt = fileName + fileExtention;
      //now create the file and write the code inside it
      fs.writeFile(folderPath + "/" + fileNameWithExt, cssFileCode, err => {
        if (err) {
          console.log(err);
        } else {
          //console.log("Sccessfully created " + fileNameWithExt + " file. ");
        }
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = cssFilesService;
