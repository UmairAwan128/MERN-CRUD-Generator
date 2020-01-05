const fs = require("fs");

const routesCodeService = require("./routesCodeService");

let instance = null;
let routesCodeServiceInst = null;

class routesService {
  constructor() {
    routesCodeServiceInst = routesCodeService.getInstance();
  }

  static getInstance() {
    if (!instance) {
      instance = new routesService();
    }
    return instance;
  }

  generateRouteFile(scheema, folderPath) {
    try {
      let fileName = scheema.tableName+"s"+".js";
      let Code = routesCodeServiceInst.GetRouteModelCode(scheema); //generate table code
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

module.exports = routesService;
