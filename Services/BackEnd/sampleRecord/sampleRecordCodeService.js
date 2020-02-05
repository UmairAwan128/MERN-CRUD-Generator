const fs = require("fs");
var path = require("path");
const CRUDConfigurations = require("../../../CRUD_Config");

let instance = null;
let sampleRecordCodeFilePath = __dirname + "../../../../"+ CRUDConfigurations.NodeAppCodeFolderName +"/sampleRecord";

class sampleRecordCodeService {
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new sampleRecordCodeService();
    }
    return instance;
  }

  GetSampleRecordFileCode() {
    var code = this.getClassAndConstructorCode(); 
    code += this.getRemainsAndExports(); // all close braces and exports
    return code;
  }

  getClassAndConstructorCode() {
    var filePath = sampleRecordCodeFilePath + "/classAndConstr.txt";
    var code = fs.readFileSync(path.resolve(filePath), "utf8");
    return code;
  }


  getRemainsAndExports() {
    var filePath = sampleRecordCodeFilePath + "/remainsAndExports.txt";
    var code = fs.readFileSync(path.resolve(filePath), "utf8");
    return code;
  }

}

module.exports = sampleRecordCodeService;
