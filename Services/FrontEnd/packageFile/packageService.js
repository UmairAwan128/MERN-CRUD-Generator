const fs = require("fs");
const packageCodeService = require("./packageCodeService");

let instance = null;
let packageCodeServiceInst = null;

class packageService {
  
  constructor() {
    packageCodeServiceInst = packageCodeService.getInstance();
  }

  static getInstance() {
    if (!instance) {
      instance = new packageService();
    }
    return instance;
  }

  generatePackageFile(folderPath, fileName, fileExtension) {
    try {
      let fileNameWithExt = fileName + fileExtension;
      let packageFileCode = packageCodeServiceInst.GetPackageFileCode(fileName); 
      //now create the file and write the code inside it
      fs.writeFile(folderPath + "/" + fileNameWithExt, packageFileCode, err => {
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

module.exports = packageService;
