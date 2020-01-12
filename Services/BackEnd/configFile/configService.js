const fs = require("fs");

const configCodeService = require("./configCodeService");

let instance = null;
let configCodeServiceInst = null;

class configService {
  
  constructor() {
    configCodeServiceInst = configCodeService.getInstance();
  }

  static getInstance() {
    if (!instance) {
      instance = new configService();
    }
    return instance;
  }

  generateConfigurations(folderPath, fileName, fileExtension) {
    try {
      let fileNameWithExt = fileName + fileExtension;
      let configCode = configCodeServiceInst.GetconfigFileCode(); 
      //now create the file and write the code inside it
      fs.writeFile(folderPath + "/" + fileNameWithExt, configCode, err => {
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

module.exports = configService;
