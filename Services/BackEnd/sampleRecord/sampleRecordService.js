const fs = require("fs");

const sampleRecordCodeService = require("./sampleRecordCodeService");

let instance = null;
let sampleRecordCodeServiceInst = null;

class sampleRecordService {
  constructor() {
    sampleRecordCodeServiceInst = sampleRecordCodeService.getInstance();
  }

  static getInstance() {
    if (!instance) {
      instance = new sampleRecordService();
    }
    return instance;
  }

  generateSampleRecordFile(scheema, folderPath, fileName) {
    try {
      let Code = sampleRecordCodeServiceInst.GetSampleRecordFileCode(scheema); //generate App file COde
      //now create the file and write the code inside it
      fs.writeFile(folderPath + "/" + fileName, Code, err => {
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

module.exports = sampleRecordService;
