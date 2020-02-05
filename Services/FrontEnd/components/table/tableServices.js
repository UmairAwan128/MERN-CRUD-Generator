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

  generateTblCRUDFile(schemaTable,schemaRelations,folderPath) {
    let fileName = schemaTable.name.toLowerCase() + "s.jsx";
    try {
      let tableCode = tblCodeServiceInst.GenerateTableCode(schemaTable,schemaRelations); //generate table code
      //now create the file and write the code inside it
      fs.writeFile(folderPath + "/" + fileName, tableCode, err => {
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

module.exports = tableService;
