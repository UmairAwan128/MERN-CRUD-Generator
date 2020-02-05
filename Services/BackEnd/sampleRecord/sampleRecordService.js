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

  generateSampleRecordFile(folderPath, fileName) {
    try {
      let Code = sampleRecordCodeServiceInst.GetSampleRecordFileCode(); //generate file COde
      //now create the file and write the code inside it
      fs.writeFile(folderPath + "/" + fileName, Code, err => {
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

module.exports = sampleRecordService;
