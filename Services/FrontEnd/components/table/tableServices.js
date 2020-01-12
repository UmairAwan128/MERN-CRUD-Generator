const fs = require("fs");

const tableCodeService = require("./tableCodeService");

let instance = null;
let tblCodeServiceInst = null;

class tableService {
  constructor() {
    tblCodeServiceInst = tableCodeService.getInstance();
  } //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new tableService();
    }
    return instance;
  }

  generateTblCRUDFile(scheema, folderPath) {
    let fileName = scheema.tableName.toLowerCase() + "s.jsx";
    try {
      let tableCode = tblCodeServiceInst.GenerateTableCode(scheema); //generate table code
      //now create the file and write the code inside it
      fs.writeFile(folderPath + "/" + fileName, tableCode, err => {
        if (err) {
          console.log(err);
        } else {
          //console.log("Sccessfully created " + fileName + " file");
        }
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = tableService;
