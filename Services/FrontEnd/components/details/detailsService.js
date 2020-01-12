const fs = require("fs");

const detailsCodeService = require("./detailsCodeService");

let instance = null;
let detailsCodeServiceInst = null;

class detailsService {
  constructor() {
    detailsCodeServiceInst = detailsCodeService.getInstance();
  }

  static getInstance() {
    if (!instance) {
      instance = new detailsService();
    }
    return instance;
  }

  generateDetailsCRUDFile(scheema, folderPath) {
    let fileName = scheema.tableName.toLowerCase() + "Details.jsx";
    try {
      let detailsCode = detailsCodeServiceInst.GenerateDetailsFileCode(scheema); //generate code
      //now create the file and write the code inside it
      fs.writeFile(folderPath + "/" + fileName, detailsCode, err => {
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

module.exports = detailsService;
