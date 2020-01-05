
let instance = null;

class servicesFolderCodeService {
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new servicesFolderCodeService();
    }
    return instance;
  }

  GetScheemaServiceCode(tblName) {
    var serviceFileCode = this.getImports();
    serviceFileCode += "\n" + 'const apiEndPoint = apiUrl + "/'+ tblName.toLowerCase() + 's"' + "\n\n" ; 
    serviceFileCode += this.GetAllRecordsCodeService(tblName); 
    serviceFileCode += this.DeleteARecordCodeService(tblName); 
    serviceFileCode += this.GetARecordCodeService(tblName); 
    serviceFileCode += this.SaveARecordCodeService(tblName); 
    return serviceFileCode;
  }

  getImports() {
    let imprtStatmnts = 'import myhttp from "./httpService";\n';
    imprtStatmnts += 'import { apiUrl } from "../CRUDAppConfigs.json";\n';
    return imprtStatmnts;
  }

  GetAllRecordsCodeService(tblName){
    let code = 'export function get'+ tblName + 's() {\n';
    code += '  return myhttp.get(apiEndPoint);\n';
    code += '}\n\n';
    return code;
  }

  DeleteARecordCodeService(tblName){
    let code = 'export function delete'+ tblName + '(id) {\n';
    code += '  return myhttp.delete(apiEndPoint + "/" + id);\n';
    code += '}\n\n';
    return code;
  }

  GetARecordCodeService(tblName){
    let code = 'export function get'+ tblName + '(id) {\n';
    code += '  return myhttp.get(apiEndPoint + "/" + id);\n';
    code += '}\n\n';
    return code;
  }

  SaveARecordCodeService(tblName){
    let code = 'export function save'+ tblName + '(' + tblName.toLowerCase() + ') {\n';
    code += '  if ('+ tblName.toLowerCase() +'._id) {\n';
    code += '    const body = { ...'+ tblName.toLowerCase() +' };\n';
    code += '    delete body._id;\n';
    code += '    return myhttp.put(apiEndPoint + "/" + '+ tblName.toLowerCase() +'._id, body);\n';
    code += '  }\n';
    code += '  return myhttp.post(apiEndPoint, '+ tblName.toLowerCase() +');\n';
    code += '}\n\n';
    return code;
  }

}

module.exports = servicesFolderCodeService;
