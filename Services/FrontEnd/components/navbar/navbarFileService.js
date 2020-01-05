const fs = require("fs");

const navbarFileCodeService = require("./navbarCodeService");

let instance = null;
let navbarFileCodeServiceInst = null;

class navbarFileService {
  constructor() {
    navbarFileCodeServiceInst = navbarFileCodeService.getInstance();
  }

  static getInstance() {
    if (!instance) {
      instance = new navbarFileService();
    }
    return instance;
  }

  generateNavbarFile(scheema, folderPath, fileName) {
    try {
      let navbarFileCode = navbarFileCodeServiceInst.GetNavbarFileCode(scheema); //generate App file COde

      //now create the file and write the code inside it
      fs.writeFile(folderPath + "/" + fileName, navbarFileCode, err => {
        if (err) {
          console.log(err);
        } else {
          console.log("Sccessfully created " + fileName + " file");
        }
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = navbarFileService;
