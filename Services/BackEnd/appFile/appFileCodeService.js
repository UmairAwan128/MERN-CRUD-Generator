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

  GetAppFileCode(scheema) {
    var appFileCode = this.getImports(); //imports
    appFileCode += this.getRouteImports(scheema); 
    appFileCode += this.getMiddlewares();
    appFileCode += this.getApiEndPointMiddlewares(scheema); 
    appFileCode += this.getAppFileRemains(scheema);
    return appFileCode;
  }

  //returns a specific import statment of Route file for specific Table.
  getRouteImports(scheema) {
    let imprtStatmnt = "";
    let tblName,routeName;
    for (var tableId in scheema) {
      tblName = scheema[tableId].tableName; 
      routeName = tblName + 's';
      imprtStatmnt = imprtStatmnt.concat('const ' + routeName + 'Route = require("./routes/'+ routeName +'");\n');
    }
    return imprtStatmnt;
  }

  getApiEndPointMiddlewares(scheema) {
    let middlewareStatmnt = "";
    let tblName,routeName;
    for (var tableId in scheema) {
      tblName = scheema[tableId].tableName; 
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

  getAppFileRemains(scheema) {
    var filePath = appFilesFolderPath + "/appRemains.txt";
    var code = fs.readFileSync(path.resolve(filePath), "utf8");
    // if(scheema.length !== 0 ){
    //   code = code.concat('  createServiceObj.createSampleRecord();\n\n');
    // }  
    code = code.concat("app.listen(5000,()=> console.log('listening on port 5000'));\n");
    return code;
  }

}

module.exports = appFileCodeService;
