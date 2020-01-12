const fs = require("fs");
var path = require("path");
const pngToIco = require("png-to-ico");
const CRUDConfigurations = require("../../CRUD_Config");

let instance = null;

class publicFilesServices {
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new publicFilesServices();
    }
    return instance;
  }

  generatePublicFolderFile(folderPath, fileName, fileExtension) {
    try {
      let filePath = __dirname + "../../../"+ CRUDConfigurations.reactAppCodeFolderName +"/public/" + fileName + ".txt";
      let Code = fs.readFileSync(path.resolve(filePath), "utf8");
      let fileNameWithExt = fileName + fileExtension;
      //now create the file and write the code inside it
      fs.writeFile(folderPath + "/" + fileNameWithExt, Code, err => {
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

  GenerateFaviconFile(folderPath) {
    try {
      pngToIco("./icoFile/favicon.png")
        .then(buf => {
          fs.writeFileSync(folderPath + "/" + "favicon.ico", buf);
          //console.log("sucessfully generated favicon file.");
        })
        .catch(console.error);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = publicFilesServices;
