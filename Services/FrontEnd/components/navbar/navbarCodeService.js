const fs = require("fs");
var path = require("path");
const CRUDConfigurations = require("../../../../CRUD_Config");

let instance = null;
let navbarFilesFolderPath = __dirname + "../../../../../"+ CRUDConfigurations.reactAppCodeFolderName +"/components/navbar";

class navbarCodeService {
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new navbarCodeService();
    }
    return instance;
  }

  GetNavbarFileCode(scheema) {
    var navbarFileCode = this.getImportsAndReturn(); //imports
    navbarFileCode += this.getSpecficNavLinks(scheema); // all close braces and exports
    navbarFileCode += this.getNavbarFileRemains();
    return navbarFileCode;
  }

  getImportsAndReturn() {
    var filePath = navbarFilesFolderPath + "/navbarImportsAndReturn.txt";
    var code = fs.readFileSync(path.resolve(filePath), "utf8");
    return code;
  }

  getNavbarFileRemains() {
    var filePath = navbarFilesFolderPath + "/navbarFileRemains.txt";
    var code = fs.readFileSync(path.resolve(filePath), "utf8");
    return code;
  }

  getSpecficNavLinks(scheema) {
    let tblName,code="";
    if(scheema.length == 0 ){
      code += '        {user && (\n';
      code += '          <li className="nav-item active">\n';
      code += '            <NavLink className="nav-link custom-nav-link" to="/sampleComponent">\n';
      code += '              sampleComponent\n';
      code += '            </NavLink>\n';
      code += '          </li>\n';
      code += '        )}\n';
    }
    else{
      for (var tableId in scheema) {
        tblName = scheema[tableId].tableName; 
        code += '        {user && (\n';
        code += '          <li className="nav-item active">\n';
        code += '            <NavLink className="nav-link custom-nav-link" to="/'+ tblName.toLowerCase() +'s">\n';
        code += '              '+ tblName +'s\n';
        code += '            </NavLink>\n';
        code += '          </li>\n';
        code += '        )}\n';
      }
    }
    return code;
  }
}

module.exports = navbarCodeService;
