let instance = null;

class modelsCodeService {
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new modelsCodeService();
    }
    return instance;
  }

  GetScheemaModelCode(scheema) {
    var modelFileCode = this.getImports(); //imports
    modelFileCode += this.getMongoDBScheema(scheema); 
    modelFileCode += this.getExpots(scheema.tableName);
    return modelFileCode;
  }

  getImports() {
    let imprtStatmnts = 'const mongoose = require("mongoose");\n\n';
    return imprtStatmnts;
  }

  getMongoDBScheema(scheema) {
    let tblName = scheema.tableName; 
    let tblColumns = scheema.columns;
    let scheemaName = tblName+"Scheema";
    let MongoDBScheema = "";
    let fieldType = "";
    MongoDBScheema = "const "+ scheemaName +" = mongoose.Schema({\n";
    for (var index in tblColumns) { // 
      fieldType = this.getMongoDBType(tblColumns[index].type);      
      MongoDBScheema = MongoDBScheema.concat(
          "  " + tblColumns[index].label + ": {\n" +
          "    type: " + fieldType+ ","+"\n"
      );
      if(tblColumns[index].hasOwnProperty('required')){
          MongoDBScheema = MongoDBScheema.concat(
            "    required: " +tblColumns[index].required+"\n"  
          );
      }
      MongoDBScheema = MongoDBScheema.concat(
        '  },'+"\n"
      );
    }

    if(scheema.hasOwnProperty('relations')){
      let tblRelations = scheema.relations;
      let dataProperty;     
      for (var index in tblRelations) {
        dataProperty = tblRelations[index].dataProperty;
        fieldType = this.getMongoDBType(dataProperty.type);      
        
        if(tblRelations[index].type.toLowerCase() == "checkbox" || tblRelations[index].type.toLowerCase() == "multiselect" ){
          MongoDBScheema = MongoDBScheema.concat(
            "  " + tblRelations[index].tableName + "s: {\n" +
            "    type: [{\n" +            
            "      Id: {\n" +
            "        type: String,\n"+
            "        required: true\n"+
            "      },\n"+
            "      " + dataProperty.name + ": {\n" +
            "        type: " + fieldType + ",\n"+
            "        required: true\n"+
            "      }\n"+
            '    }],'+"\n"+
            "    required: true\n"+
            "  },\n"            
          );
        }
        else if(tblRelations[index].type.toLowerCase() == "radio" || tblRelations[index].type.toLowerCase() == "select"){
          MongoDBScheema = MongoDBScheema.concat(
            "  " + tblRelations[index].tableName + ": {\n" +
            "    Id: {\n" +
            "      type: String,\n"+
            "      required: true\n"+
            "    },\n"+
            "    " + dataProperty.name + ": {\n" +
            "      type: " + fieldType + ",\n"+
            "      required: true\n"+
            "    }\n"+
            '  },'+"\n"
          );
        } 

      }
    }
    MongoDBScheema = MongoDBScheema.concat(
       '  createdAt:{\n'+
       '    type: Date,\n'+
       '    default: Date.now'+'\n'+
       '  }\n'+
       '});'+"\n\n"
    ); 
    return MongoDBScheema;
  }

  getMongoDBType(scheemaType){
    if(scheemaType == "number"){
       return "Number"; 
    }
    else if(scheemaType == "text" || scheemaType == "email" || scheemaType == "password"){
      return "String"; 
    }
    else if(scheemaType == "date"){
      return "Date";
    }
  } 

  getExpots(tblName) {
    let eportStatmnts = 'module.exports = mongoose.model("'+ tblName+'s"' + ', ' + tblName+'Scheema);';
    return eportStatmnts;
  }
}

module.exports = modelsCodeService;
