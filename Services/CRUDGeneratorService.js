const fs = require("fs");
var Validator = require('jsonschema').Validator;
const CRUDConfigurations = require("../CRUD_Config");

const frontEndGenerateService = require("./FrontEnd/FrontEndService");
const backEndGenerateService = require("./BackEnd/BackEndService");

let instance = null;
let frontEndGenerateServiceObj = null;
let backEndGenerateServiceObj = null;

class CRUDGeneratorService {
    constructor() {
        frontEndGenerateServiceObj = frontEndGenerateService.getInstance();
        backEndGenerateServiceObj = backEndGenerateService.getInstance();
    }

    static getInstance() {
      if (!instance) {
        instance = new CRUDGeneratorService();
      }
      return instance;
    }
  
    generateCRUD(scheema, outputFolderLoc,onlyNodeApp) {//C:\Work\UNIRelated\FYP\pack\CRUD_Generator_React
        
      const appScheema = scheema["appSchema"] ? scheema["appSchema"] : ""; //get appScheema
      const databaseName = scheema["appDbName"] ? scheema["appDbName"] : "";
      const applicationName = scheema["appName"] ? scheema["appName"] : "";
      const applicationTheme = scheema["appTheme"] ? scheema["appTheme"] : "";
      let outputFolderName = "AppGenerated"; 
      let projectFolderName, ReactProjectFolderName, NodeProjectFolderName, projectDatabaseName;

      if(applicationName){ //if user passed name for its application  
        projectFolderName = applicationName; //+ "App";
        ReactProjectFolderName = applicationName + "ReactApp";
        NodeProjectFolderName = applicationName + "NodeApp";

        //also setting values to crudConfig so it will be accessible accross the application
        CRUDConfigurations.ProjectFolderName = projectFolderName;
        CRUDConfigurations.ReactProjectFolderName = ReactProjectFolderName;
        CRUDConfigurations.NodeProjectFolderName = NodeProjectFolderName;  
      }
      else{ //use default or preset names
        projectFolderName = CRUDConfigurations.DefaultProjectFolderName;
        ReactProjectFolderName = CRUDConfigurations.DefaultReactProjectFolderName;
        NodeProjectFolderName = CRUDConfigurations.DefaultNodeProjectFolderName;  
        //and set them to crudConfig so it will be accessible accross the application
        CRUDConfigurations.ProjectFolderName = CRUDConfigurations.DefaultProjectFolderName;
        CRUDConfigurations.ReactProjectFolderName = CRUDConfigurations.DefaultReactProjectFolderName;
        CRUDConfigurations.NodeProjectFolderName = CRUDConfigurations.DefaultNodeProjectFolderName; 
      }

      if(databaseName){ //if user passed name for its project database  
        projectDatabaseName = databaseName;
        //also setting values to crudConfig so it will be accessible accross the application
        CRUDConfigurations.ProjectDatabaseName = projectDatabaseName; 
      }
      else if(applicationName){//if user passed name for its project only so use that as DBName 
        projectDatabaseName = applicationName;
        //also setting values to crudConfig so it will be accessible accross the application
        CRUDConfigurations.ProjectDatabaseName = projectDatabaseName; 
      }
      else{ //not passed any so use default or preset names
        projectDatabaseName = CRUDConfigurations.DefaultProjectDatabaseName;
        CRUDConfigurations.ProjectDatabaseName = CRUDConfigurations.DefaultProjectDatabaseName; 
      }

      if(applicationTheme){ //if user passed name for its project theme 
        //also setting values to crudConfig so it will be accessible accross the application
        CRUDConfigurations.ProjectThemeName = applicationTheme; 
      }
      else{ //use default or preset theme
        CRUDConfigurations.ProjectThemeName = CRUDConfigurations.DefaultProjectThemeName; 
      }

        let outputFolderPath = outputFolderLoc +"/" + outputFolderName ;
        if (!fs.existsSync(outputFolderPath)) {
          fs.mkdirSync(outputFolderPath);
        }
        let projectFolderPath = outputFolderPath + "/" + projectFolderName ;
        if (!fs.existsSync(projectFolderPath)) {
          fs.mkdirSync(projectFolderPath);
        }
        const ReactProjectFolderCompName =  projectFolderPath +"/"+ ReactProjectFolderName;
        const NodeProjectFolderCompName =  projectFolderPath +"/"+ NodeProjectFolderName;
          
        try {
          let isCodeGenerated = backEndGenerateServiceObj.generateBackend(
            appScheema,  
            NodeProjectFolderCompName
          );
          
          if(onlyNodeApp == false){  //only if 
            isCodeGenerated = frontEndGenerateServiceObj.generateFrontEnd(
              appScheema,
              ReactProjectFolderCompName
            );
          }
          
          return isCodeGenerated;
      } 
      catch (e) {
          console.log(e);
          return false;
      }
    }

    showScheema(scheema) {
      var schemaTables = scheema.tables; 
      var schemaRelations = scheema.relations; 

      for (var tableId in schemaTables) {
        var tableName = schemaTables[tableId].name; 
        var tableColumns = schemaTables[tableId].columns; 
        console.log(tableName);
        for (var column in tableColumns) {
          console.log(
            "key:" +
              column +
              ", name:" +
              tableColumns[column].name +
              ", type:" +
              tableColumns[column].type +
              ", required:" +
              tableColumns[column].required
          );
        }
      }
      console.log("\n relations:______ \n");
      for (var relId in schemaRelations) {
        var firstTable = schemaRelations[relId].firstTable; 
        var secondTable = schemaRelations[relId].secondTable; 
        var relationType = schemaRelations[relId].relationType; 
        var secondTableColumn = schemaRelations[relId].secondTableColumn; 
        console.log(
            firstTable +
            " -- " +
            relationType +
           " --> "+
            secondTable +
            " ( " +
            secondTableColumn +
            " ) "
        );
      }
    }


    validateScheema(scheema) {
      var validator = new Validator();
      var columnsScheema = {
        "id": "/tblColumn",
        "type": "object",
        "properties": {
          "name": {"type": "string"},
          "type": { 
            "enum": [
              "text","number","email","password","date"
            ]
          },
          "required": {"type": "boolean"}
        },
        "required": ["name","type"]
      };  
      var tblSchema = {
        "id": "/tblScheema",
        "type": "object",
        "properties": {
          "name": {
              "type": "string",
              "pattern": "^[A-Z][a-zA-Z]*$"
          },
          "columns": {
            "type": "array",
            "items": {"$ref": "/tblColumn"},
            "uniqueItems": true
          }
        },
        "required": ["name","columns"]
      };    
      var relationsSchema = {
        "id": "/tblRelation",
        "type": "object",
        "properties": {
          "firstTable": {
              "type": "string",
              "pattern": "^[A-Z][a-zA-Z]*$"
          },
          "secondTable": {
              "type": "string",
              "pattern": "^[A-Z][a-zA-Z]*$"
          },
          "relationType": {
            "enum": [
              "select", "radio", "checkBox","multiselect","oneToMany","manyToMany"
            ]
          },
          "secondTableColumn": {"type": "string"}
        },
        "required": ["firstTable","secondTable","relationType","secondTableColumn"]
      };
          
      var appSchema = {
        "id": "/appSchema",
        "type": "object",
        "properties": {
          "tables": {
            "type": "array",
            "items": {"$ref": "/tblScheema"},
            "uniqueItems": true
          },
          "relations": {
            "type": "array",
            "items": {"$ref": "/tblRelation"},
            "uniqueItems": true
          }
        },
        "required": ["tables"]
      };

      var crudGenSchema = {
        "id": "/crudGenSchema",
        "type": "object",
        "properties": {
          "appName": {
              "type": "string"
          },
          "appTheme": {
            "enum": [
              "dark", "defaultLight", "electricBlue"
            ]
          },
          "appDbName": {
            "type": "string"
          },
          "appSchema": {
            "$ref": "/appSchema"
          }
        },
        "required": ["appSchema"]
      };

      validator.addSchema(columnsScheema, '/tblColumn');
      validator.addSchema(tblSchema, '/tblScheema');
      validator.addSchema(relationsSchema, '/tblRelation');
      validator.addSchema(appSchema, '/appSchema');
      let errors = validator.validate(scheema, crudGenSchema);
      if(errors != "" ){
        return errors; 
      }
      else{ //check for other validations
        var schemaTables = scheema["appSchema"].tables;
        var schemaRelations = scheema["appSchema"].relations;
          
        for(var tableId in schemaTables){ //makesure user cannot create a table with name "user".
            var tableName = schemaTables[tableId].name; 
            if( tableName.toLowerCase() == "user"){
                errors += '0: "'+ tableName +'" is not a valid tableName as this will be generated automatically, please use something else.';
                return errors;   
            }    
        }
        
        //check if user has made relations b/w the tables that exist in Scheema
        //and if a relation is not defined again with another relation type 
        //and relation is not redefine from other side i.e for first->second we are getting second -> first 
        for (var relationId in schemaRelations) { // in case of relation there are two tables first table makes relation with second table column
           
            var firstTable = schemaRelations[relationId].firstTable;
            var secondTable = schemaRelations[relationId].secondTable;
            var secondTableColumn = schemaRelations[relationId].secondTableColumn;
            var firstTableFound=false, secondTableFound=false, secondTableColumnFound=false;

            if( firstTable == secondTable){ //if user try to make a table relation with itself
              errors += "0: A table cannot have relation with it self please use different table names on instance[appSchema].relations["+relationId+"].";
              return errors;
            }
            
            if( firstTable.toLowerCase() == "user"){ //user table cannot make relation with anyother table
              errors += '0: "'+ firstTable +'" table cannot be used as firstTable or cannot make relation with other tables, please use any other table.';
              return errors;   
            }    
  
            //check if user has made relations b/w the tables that exist in Scheema
            for(var tableId in schemaTables){
              
              var tableName = schemaTables[tableId].name; 
              
              if(tableName == firstTable){
                  firstTableFound = true; 
              }

              if(tableName == secondTable){
                  secondTableFound = true;
                  var tableColumns = schemaTables[tableId].columns;  //get table columns

                  for (var columnId in tableColumns) { //then iterate through its columns
                    var columnName = tableColumns[columnId].name; // and get the name of each column
                    if(columnName == secondTableColumn){ //check if it matches with any second table columnName
                      secondTableColumnFound = true;
                    }
                  }

                  if(!secondTableColumnFound){ //so column name is invalid
                      errors += "0: invalid column name used in secondTableColumn on instance[appSchema].relations["+relationId+"], please specify name of column that exist in "+secondTable+" scheema.";
                      return errors;
                  }

              }

              if(secondTable.toLowerCase() == "user"){ //if other table try making realtion with user table
                secondTableFound = true;
                if( 
                    !(
                      secondTableColumn == "name" || secondTableColumn == "email" ||
                      secondTableColumn == "password"
                    )
                ){
                  errors += "0: invalid column name used in secondTableColumn on instance[appSchema].relations["+relationId+"], "+secondTableColumn+" table only has name,email,password fields so use any of these.";
                  return errors;
                }
                secondTableColumnFound = true;            
              }

            }//end of tables for  
        
            if(!firstTableFound){ // firstTable not found
              errors += "0: invalid table name used on firstTable of instance[appSchema].relations["+relationId+"], please specify name of table that you provided in scheema.";
              return errors;
            }
            if(!secondTableFound){ // secondTable not found
              errors += "0: invalid table name used on secondTable of instance[appSchema].relations["+relationId+"], please specify name of table that you provided in scheema.";
              return errors;
            }
            if(!secondTableColumnFound){ // secondTable column not found
              errors += "0: invalid column name used on secondTableColumn of instance[appSchema].relations["+relationId+"], please specify name of column that exist in "+secondTable+".";
              return errors;
            }

            //check if a relation is not defined again with another relation type 
            //and relation is not redefine from other side i.e for first->second we are getting second -> first 
            for (var inneerRelationId in schemaRelations) { // in case of relation there are two tables first table makes relation with second table column
                var innerFirstTable = schemaRelations[relationId].firstTable;
                var innerSecondTable = schemaRelations[relationId].secondTable;
                if(relationId == inneerRelationId){ //if comparing with itself
                   continue; //skip iteration    
                }
                else if(
                        ( firstTable == innerFirstTable && secondTable == innerSecondTable) || 
                        (firstTable == innerSecondTable && secondTable == innerFirstTable)
                       ){
                  errors += "0: There can only be one relation between two tables, relation between "+ firstTable +" and "+ secondTable+" are defined twice on instance[appSchema].relations["+relationId+"] and instance[appSchema].relations["+inneerRelationId+"]";
                  return errors; 
                }                
            }
        } //end of relations for
        return "";            
      }
    }
}

module.exports = CRUDGeneratorService;





