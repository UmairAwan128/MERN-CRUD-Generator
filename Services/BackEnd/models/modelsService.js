const fs = require("fs");

const modelsCodeService = require("./modelsCodeService");

let instance = null;
let modelsCodeServiceInst = null;

class modelsService {
  
  constructor() {
    modelsCodeServiceInst = modelsCodeService.getInstance();
  }

  static getInstance() {
    if (!instance) {
      instance = new modelsService();
    }
    return instance;
  }

  generateModel(scheema, folderPath) {
    try {
      let fileName = scheema.tableName+".js";
      let modelCode = modelsCodeServiceInst.GetScheemaModelCode(scheema); 
      //now create the file and write the code inside it
      fs.writeFile(folderPath + "/" + fileName, modelCode, err => {
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

module.exports = modelsService;
