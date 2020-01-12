const fs = require("fs");
var path = require("path");
const CRUDConfigurations = require("../../../CRUD_Config");

let instance = null;
let appFilesFolderPath = __dirname + "../../../../"+ CRUDConfigurations.reactAppCodeFolderName +"/appFile";

class appFileCodeService {
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new appFileCodeService();
    }
    return instance;
  }

  GetAppFileCode(scheema) {
    var appFileCode = this.getImports(scheema); //imports
    appFileCode += this.getAppFileClassAndRender();
    appFileCode += this.getSpecficRoutes(scheema); // all close braces and exports
    appFileCode += this.getAppFileRoutes(); // all close braces and exports
    appFileCode += this.getIndexRoute(scheema); // all close braces and exports
    appFileCode += this.getAppFileRemains();
    return appFileCode;
  }

  getImports(scheema) {
    let tblName;
    var filePath = appFilesFolderPath + "/appImports.txt";
    var code = fs.readFileSync(path.resolve(filePath), "utf8");
    if(scheema.length == 0 ){
      code = code.concat('import SampleComponent from "./components/sampleComponent";\n');
    }
    else{
        for (var tableId in scheema) {
            tblName = scheema[tableId].tableName; 
            code = code.concat('import '+ tblName +'s from "./components/'+ tblName.toLowerCase() +'s";\n');
            code = code.concat('import '+ tblName +'Form from "./components/'+ tblName.toLowerCase() +'Form";\n');
            code = code.concat('import '+ tblName +'Details from "./components/'+ tblName.toLowerCase() +'Details";\n');
        }    
    }
    return code;
  }


  getAppFileClassAndRender() {
    var filePath = appFilesFolderPath + "/appClassAndRender.txt";
    var code = fs.readFileSync(path.resolve(filePath), "utf8");
    return code;
  }

  getSpecficRoutes(scheema) {
    let tblName,code="";
    if(scheema.length == 0 ){
      code = code.concat('            <Route\n');
      code = code.concat('                path="/sampleComponent" ');
      code = code.concat('                render={props => {\n');
      code = code.concat('                  if (!auth.isUserLoggedIn()) return <Redirect to="/login" />;\n');
      code = code.concat('                  return <SampleComponent {...props} />;\n');
      code = code.concat('                }}\n');
      code = code.concat('            />\n');
    }
    else{
      for (var tableId in scheema) {
            tblName = scheema[tableId].tableName; 
            code = code.concat('            <Route\n');
            code = code.concat('                path="/'+ tblName.toLowerCase() +'s/:id"\n');
            code = code.concat('                render={props => {\n');
            code = code.concat('                  if (!auth.isUserLoggedIn()) return <Redirect to="/login" />;\n');
            code = code.concat('                  return <'+ tblName +'Form {...props} />;\n');
            code = code.concat('                }}\n');
            code = code.concat('            />\n');
            code = code.concat('            <Route\n');
            code = code.concat('                path="/view'+ tblName+'/:id"\n');
            code = code.concat('                render={props => {\n');
            code = code.concat('                  if (!auth.isUserLoggedIn()) return <Redirect to="/login" />;\n');
            code = code.concat('                  return <'+ tblName +'Details {...props} />;\n');
            code = code.concat('                }}\n');
            code = code.concat('            />\n');
            code = code.concat('            <Route\n');
            code = code.concat('                path="/'+ tblName.toLowerCase() +'s"\n');
            code = code.concat('                render={props => {\n');
            code = code.concat('                  if (!auth.isUserLoggedIn()) return <Redirect to="/login" />;\n');
            code = code.concat('                  return <'+ tblName +'s {...props} />;\n');
            code = code.concat('                }}\n');
            code = code.concat('            />\n\n');
      }
    }
    return code;
  }

  getAppFileRoutes() {
    var filePath = appFilesFolderPath + "/appRoutes.txt";
    var code = fs.readFileSync(path.resolve(filePath), "utf8");
    return code;
  }
  
  getIndexRoute(scheema) {
    let code = "";
    if(scheema.length == 0 ){
      code += '\n            <Redirect from="/" exact to="/sampleComponent" />';
    }
    else{
      let tblName = scheema[0].tableName; 
      code += '\n            <Redirect from="/" exact to="/'+ tblName.toLowerCase() +'s" />';
    }
    return code;

  }
   
  getAppFileRemains() {
    var filePath = appFilesFolderPath + "/appRemains.txt";
    var code = fs.readFileSync(path.resolve(filePath), "utf8");
    return code;
  }
}

module.exports = appFileCodeService;
