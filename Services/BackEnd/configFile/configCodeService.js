const CRUDConfigurations = require("../../../CRUD_Config");
let instance = null;

class configCodeService {
  
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new configCodeService();
    }
    return instance;
  }

  GetconfigFileCode() {
    let code = "";
    code = code.concat(
      'var config = {\n'+
      '  DB_CONNECTION: "mongodb://localhost:27017/'+CRUDConfigurations.ProjectDatabaseName+'",\n'+
      '  TOKKEN_SECRET: "231sad_ItCanBeAnyRandString_UGHASD82371923192J"'+'\n'+
      '};\n'+
      'module.exports = config;'     
    );
    return code;
  } 

}

module.exports = configCodeService;
