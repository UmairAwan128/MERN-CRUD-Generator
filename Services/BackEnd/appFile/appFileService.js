const fs = require("fs");

const appFileCodeService = require("./appFileCodeService");

let instance = null;
let appFileCodeServiceInst = null;

class appFileService {
  constructor() {
    appFileCodeServiceInst = appFileCodeService.getInstance();
  }

  static getInstance() {
    if (!instance) {
      instance = new appFileService();
    }
    return instance;
  }

  generateAppFile(schemaTables, folderPath, fileName) {
    try {
      let appFileCode = appFileCodeServiceInst.GetAppFileCode(schemaTables); //generate App file COde

      //now create the file and write the code inside it
      fs.writeFile(folderPath + "/" + fileName, appFileCode, err => {
        if (err) {
          console.log(err);
        } 
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = appFileService;
