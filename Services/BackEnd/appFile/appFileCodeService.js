const fs = require("fs");
var path = require("path");
const CRUDConfigurations = require("../../../CRUD_Config");

let instance = null;
let appFilesFolderPath = __dirname + "../../../../"+ CRUDConfigurations.NodeAppCodeFolderName +"/appFile";

class appFileCodeService {
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new appFileCodeService();
    }
    return instance;
  }

  GetAppFileCode(schemaTables) {
    var appFileCode = this.getImports(); //imports
    appFileCode += this.getRouteImports(schemaTables); 
    appFileCode += this.getMiddlewares();
    appFileCode += this.getApiEndPointMiddlewares(schemaTables); 
    appFileCode += this.getAppFileRemains();
    return appFileCode;
  }

  //returns a specific import statment of Route file for specific Table.
  getRouteImports(schemaTables) {
    let imprtStatmnt = "";
    let tblName,routeName;
    for (var tableId in schemaTables) {
      tblName = schemaTables[tableId].name; 
      routeName = tblName + 's';
      imprtStatmnt = imprtStatmnt.concat('const ' + routeName + 'Route = require("./routes/'+ routeName +'");\n');
    }
    return imprtStatmnt;
  }

  getApiEndPointMiddlewares(schemaTables) {
    let middlewareStatmnt = "";
    let tblName,routeName;
    for (var tableId in schemaTables) {
      tblName = schemaTables[tableId].name; 
      routeName = tblName + 's';
      middlewareStatmnt = middlewareStatmnt.concat('app.use("/api/' + routeName.toLowerCase() + '", '+ routeName +'Route);\n');
    }
    return middlewareStatmnt;
  }


  getImports() {
    var filePath = appFilesFolderPath + "/appImports.txt";
    var code = fs.readFileSync(path.resolve(filePath), "utf8");
    return code;
  }

  getMiddlewares() {
    var filePath = appFilesFolderPath + "/appMiddlewares.txt";
    var code = fs.readFileSync(path.resolve(filePath), "utf8");
    return code;
  }

  getAppFileRemains() {
    var filePath = appFilesFolderPath + "/appRemains.txt";
    var code = fs.readFileSync(path.resolve(filePath), "utf8");
    code = code.concat("app.listen(5000,()=> console.log('listening on port 5000'));\n");
    return code;
  }

}

module.exports = appFileCodeService;
