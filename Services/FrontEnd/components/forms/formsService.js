const fs = require("fs");

const formsCodeService = require("./formsCodeService");

let instance = null;
let formsCodeServiceInst = null;

class formsService {
  constructor() {
    formsCodeServiceInst = formsCodeService.getInstance();
  }

  static getInstance() {
    if (!instance) {
      instance = new formsService();
    }
    return instance;
  }

  generateFormCRUDFile(schemaTable,schemaRelations, folderPath) {
    let fileName = schemaTable.name.toLowerCase() + "Form.jsx";
    try {
      let formCode = formsCodeServiceInst.GenerateFormCode(schemaTable,schemaRelations); //generate table code
      //now create the file and write the code inside it
      fs.writeFile(folderPath + "/" + fileName, formCode, err => {
        if (err) {
          console.log(err);
        } else {
          //console.log("Sccessfully created form file");
        }
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = formsService;
