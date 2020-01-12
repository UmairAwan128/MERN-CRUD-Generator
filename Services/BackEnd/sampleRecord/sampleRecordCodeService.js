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

  GetSampleRecordFileCode(scheema) {
    var code = this.getImports(scheema); //imports
    code += this.getClassAndConstructorCode(); // render() and state
    code += this.getSampleRecordCode(scheema);
    code += this.getRemainsAndExports(); // all close braces and exports
    return code;
  }

  //returns a specific import statment of code file for specific Table.
  getImports(scheema) {
    let imprtStatmnt = "";
    // let tblName;
    // for (var tableId in scheema) {
    //   tblName = scheema[tableId].tableName; 
    //   imprtStatmnt = imprtStatmnt.concat('const ' + tblName + ' = require("../models/'+ tblName +'");\n');
    // }
    return imprtStatmnt;
  }

  getClassAndConstructorCode() {
    var filePath = sampleRecordCodeFilePath + "/classAndConstr.txt";
    var code = fs.readFileSync(path.resolve(filePath), "utf8");
    return code;
  }

  getSampleRecordCode(scheema) {
    let code = "";
    // let tblName,tblColumns;
    // if(scheema.length == 0){
    //    return code;
    // }
    // else{
    //   code = "\n  async createSampleRecord() {\n";
    //   for (var tableId in scheema) {
    //     tblName = scheema[tableId].tableName;
    //     tblColumns = scheema[tableId].columns;
    //     code += '    const sample'+ tblName +' = new '+tblName+'({\n';
    //     for (var column in tblColumns) {
    //       if(tblColumns[column].type == "text" || tblColumns[column].type == "email" || tblColumns[column].type == "password"){
    //         code = code.concat("      " + tblColumns[column].label + ": " + '"sample' +tblColumns[column].label+'",'+ "\n"); 
    //       }
    //       else if(tblColumns[column].type == "bool"){
    //           code = code.concat("      " + tblColumns[column].label + ": " + "true,"+ "\n");     
    //       }
    //       else if(tblColumns[column].type == "number"){
    //           code = code.concat("      " + tblColumns[column].label + ": " + "0,"+ "\n");     
    //       }
    //       else if(tblColumns[column].type == "date"){
    //         code = code.concat("      " + tblColumns[column].label + ": " + '"1111-11-11T11:11:11.111+11:11",'+ "\n"); 
    //       }
    //     }

    //     if(scheema[tableId].hasOwnProperty('relations')){
    //         let tblRelations = scheema[tableId].relations; 
    //         let dataProperty;     
    //         for (var index in tblRelations) {
    //           dataProperty = tblRelations[index].dataProperty;
    //           if(tblRelations[index].type.toLowerCase() == "select" || tblRelations[index].type.toLowerCase() == "radio" || tblRelations[index].type.toLowerCase() == "onetomany"){
    //             code = code.concat(
    //               "      " + tblRelations[index].tableName + ": {\n"
    //             );
    //           }
    //           else if(tblRelations[index].type.toLowerCase() == "checkbox" || tblRelations[index].type.toLowerCase() == "multiselect"|| tblRelations[index].type.toLowerCase() == "manytomany"){
    //             code = code.concat(
    //               "      " + tblRelations[index].tableName + "s: [{\n"
    //             );
    //           }
    //           code = code.concat(
    //             '        Id: "sampleId",\n ' 
    //           );
    //           if(dataProperty.type == "text" || dataProperty.type == "email" || dataProperty.type == "password"){
    //             code = code.concat(
    //               "       " + dataProperty.name + ': "sample' + dataProperty.name+'"');
    //           }
    //           else if(dataProperty.type == "bool"){
    //             code = code.concat(
    //               "    " + dataProperty.name + ": true \n");
    //           }
    //           else if(dataProperty.type == "number"){
    //             code = code.concat(
    //               "    " + dataProperty.name + ": 0 \n");
    //           }
    //           else if(dataProperty.type == "date"){
    //             code = code.concat(
    //               "    " + dataProperty.name + ": 1111-11-11T11:11:11.111+11:11 \n");
    //           }

    //           if(tblRelations[index].type.toLowerCase() == "select" || tblRelations[index].type.toLowerCase() == "radio"|| tblRelations[index].type.toLowerCase() == "onetomany"){
    //             code = code.concat(
    //               "\n      },\n"
    //             );
    //           }
    //           else if(tblRelations[index].type.toLowerCase() == "checkbox" || tblRelations[index].type.toLowerCase() == "multiselect" || tblRelations[index].type.toLowerCase() == "manytomany"){
    //             code = code.concat(
    //               "\n      }],\n"
    //             );
    //           }
    //         }
    //       }
    //       code += '    });\n\n'; 
    //     }

    //   }
    //   code += '    try {\n'; 
      
    //   for (var tableId in scheema) {
    //     tblName = scheema[tableId].tableName;
    //     code += '      const result'+ tblName +' = await sample'+ tblName +'.save();\n';
    //   }
  
    //   code += '      console.log("Your Database is created with a Sample Record");\n';
    //   code += '    }\n';
    //   code += '    catch (ex) {\n';
    //   code += '      for (property in ex.errors) {\n';
    //   code += '      console.log(ex.errors[property]);\n';
    //   code += '      }\n';
    //   code += '    }\n';
    //   code += '  }\n';
      return code;  
    }

  getRemainsAndExports() {
    var filePath = sampleRecordCodeFilePath + "/remainsAndExports.txt";
    var code = fs.readFileSync(path.resolve(filePath), "utf8");
    return code;
  }

}

module.exports = sampleRecordCodeService;
