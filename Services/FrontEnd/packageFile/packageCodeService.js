const fs = require("fs");
var path = require("path");
const CRUDConfigurations = require("../../../CRUD_Config");
let instance = null;

class packageFileCodeService {
  
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new packageFileCodeService();
    }
    return instance;
  }

  GetPackageFileCode(fileName) {
    let filePath = __dirname + "../../../../"+ CRUDConfigurations.reactAppCodeFolderName + "/" + fileName + ".txt";
    let remainingCode = fs.readFileSync(path.resolve(filePath), "utf8");    
    let code = "";
    code = code.concat(
      '{'+
      ' "name": "'+CRUDConfigurations.ReactProjectFolderName+'",'+
      '\n'+
      remainingCode  
    );
    return code;
  } 

}

module.exports = packageFileCodeService;
