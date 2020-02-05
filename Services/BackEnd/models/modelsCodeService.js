let instance = null;

class modelsCodeService {
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new modelsCodeService();
    }
    return instance;
  }

  GetScheemaModelCode(currentTable,schemaTables,schemaRelations) { //
    var modelFileCode = this.getImports(); //imports
    modelFileCode += this.getMongoDBScheema(currentTable,schemaTables,schemaRelations); 
    modelFileCode += this.getExpots(currentTable.name);
    return modelFileCode;
  }

  getImports() {
    let imprtStatmnts = 'const mongoose = require("mongoose");\n\n';
    return imprtStatmnts;
  }

  getMongoDBScheema(currentTable,schemaTables,schemaRelations) {
    
    let tblName = currentTable.name; 
    let tblColumns = currentTable.columns;
    let scheemaName = tblName+"Scheema";
    let MongoDBScheema = "";
    let fieldType = "";
    
    MongoDBScheema = "const "+ scheemaName +" = mongoose.Schema({\n";
    
    for (var index in tblColumns) { 
      fieldType = this.getMongoDBType(tblColumns[index].type);      
      MongoDBScheema = MongoDBScheema.concat(
          "  " + tblColumns[index].name + ": {\n" +
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

    if(schemaRelations != null){ //if not passed by user
      let firstTable,secondTable,relationType,secondTableColumn,secondTableColumnType;
      let innerTableName, innerColumns;
          
      for (var index in schemaRelations) { //so we have all the relations
        firstTable = schemaRelations[index].firstTable; // get each realtions firstTable 
        if( tblName == firstTable){ // if its same as the currentTable i.e tblName then this relation belongs to current table
          secondTable = schemaRelations[index].secondTable; 
          relationType = schemaRelations[index].relationType; 
          secondTableColumn = schemaRelations[index].secondTableColumn; 
          
          //get the respective secondColumn type    
          if(secondTable.toLowerCase() == "user"){ //if second table is User
            secondTableColumnType = this.getMongoDBType("text"); //as all the fields are string type so direct text passed   
          }
          else{ //find the table in the schemaTables that user gave
              for (var tableId in schemaTables) { //first find secondTable from all the tables
                innerTableName = schemaTables[tableId].name;
                if(innerTableName == secondTable){  //if found 
                  innerColumns = schemaTables[tableId].columns;
                  for (var colIndex in innerColumns) { //traverse through its columns
                    if( innerColumns[colIndex].name == secondTableColumn){ //if column name is equal get respective type
                      secondTableColumnType = this.getMongoDBType(innerColumns[colIndex].type);   
                      break;   
                    }
                  }  
                }
              }
          }
          
          if(relationType.toLowerCase() == "checkbox" || relationType.toLowerCase() == "multiselect"  || relationType.toLowerCase() == "manytomany"){
            MongoDBScheema = MongoDBScheema.concat(
              "  " + secondTable + "s: {\n" +
              "    type: [{\n" +            
              "      Id: {\n" +
              "        type: String,\n"+
              "        required: true\n"+
              "      },\n"+
              "      Name: {\n" +
              "        type: " + secondTableColumnType + ",\n"+
              "        required: true\n"+
              "      }\n"+
              '    }],'+"\n"+
              "    required: true\n"+
              "  },\n"            
            );
          }
          else if(relationType.toLowerCase() == "radio" || relationType.toLowerCase() == "select" || relationType.toLowerCase() == "onetomany"){
            MongoDBScheema = MongoDBScheema.concat(
              "  " + secondTable + ": {\n" +
              "    Id: {\n" +
              "      type: String,\n"+
              "      required: true\n"+
              "    },\n"+
              "    Name: {\n" +
              "      type: " + secondTableColumnType + ",\n"+
              "      required: true\n"+
              "    }\n"+
              '  },'+"\n"
            );
          }   
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
