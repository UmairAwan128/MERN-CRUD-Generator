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

  generateModel(currentTable,schemaTables,schemaRelations, folderPath) {
    try {
      let fileName = currentTable.name+".js";
      let modelCode = modelsCodeServiceInst.GetScheemaModelCode(currentTable,schemaTables,schemaRelations); 
      //now create the file and write the code inside it
      fs.writeFile(folderPath + "/" + fileName, modelCode, err => {
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

module.exports = modelsService;
