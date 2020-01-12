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
  
    generateCRUD(scheema, outputFolderLoc) {//C:\Work\UNIRelated\FYP\pack\CRUD_Generator_React
        
        const crudScheema = scheema["crudSchema"] ? scheema["crudSchema"] : ""; //get crudScheema
        const databaseName = scheema["databaseName"] ? scheema["databaseName"] : "";
        const applicationName = scheema["applicationName"] ? scheema["applicationName"] : "";
        const applicationTheme = scheema["applicationTheme"] ? scheema["applicationTheme"] : "";
        
        //const tblName = scheema[0].tableName;
        //const tblColumns = scheema[0].columns;
        //this.showScheema(crudScheema);
         
        let outputFolderName = "output";
        let projectFolderName, ReactProjectFolderName, NodeProjectFolderName, projectDatabaseName;

        if(applicationName){ //if user passed name for its application  
          projectFolderName = applicationName + "App";
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

          CRUDConfigurations.ProjectFolderName = CRUDConfigurations.DefaultProjectFolderName;
          CRUDConfigurations.ReactProjectFolderName = CRUDConfigurations.DefaultReactProjectFolderName;
          CRUDConfigurations.NodeProjectFolderName = CRUDConfigurations.DefaultNodeProjectFolderName; 
        }

        if(databaseName){ //if user passed name for its project database  
          projectDatabaseName = databaseName + "DB";
          //also setting values to crudConfig so it will be accessible accross the application
          CRUDConfigurations.ProjectDatabaseName = projectDatabaseName; 
        }
        else{ //use default or preset names
          projectDatabaseName = CRUDConfigurations.DefaultProjectDatabaseName;
          CRUDConfigurations.ProjectDatabaseName = CRUDConfigurations.DefaultProjectDatabaseName; 
        }

        if(applicationTheme){ //if user passed name for its project theme 
          //also setting values to crudConfig so it will be accessible accross the application
          CRUDConfigurations.ProjectThemeName = applicationTheme; 
        }
        else{ //use default or preset names
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
              crudScheema,  
              NodeProjectFolderCompName
            );
            
            isCodeGenerated = frontEndGenerateServiceObj.generateFrontEnd(
              crudScheema,
              ReactProjectFolderCompName
            );
            
            return isCodeGenerated;
        } 
        catch (e) {
            console.log(e);
            return false;
        }
    }

    showScheema(scheema) {
      for (var objectId in scheema) {
        var tableName = scheema[objectId].tableName; 
        var tableColumns = scheema[objectId].columns; 
        console.log(tableName);
        for (var column in tableColumns) {
          console.log(
            "key:" +
              column +
              ", label:" +
              tableColumns[column]["label"] +
              ", type:" +
              tableColumns[column].type
          );
        }
      }
    }


    validateScheema(scheema) {
      var validator = new Validator();
      var dataPropScheema = {
        "id": "/dataPropScheema",
        "type": "object",
        "properties": {
          "name": {"type": "string"},
          "type": { 
            "enum": [
              "text","number","email","password","date"
            ]
          }
        },
        "required": ["name","type"]
      };
      var columnsScheema = {
        "id": "/tblColumn",
        "type": "object",
        "properties": {
          "label": {"type": "string"},
          "type": { 
            "enum": [
              "text","number","email","password","date"
            ]
          },
          "required": {"type": "boolean"}
        },
        "required": ["label","type"]
      };    
      var relationsScheema = {
        "id": "/tblRelation",
        "type": "object",
        "properties": {
          "tableName": {
              "type": "string",
              "pattern": "^[A-Z][a-zA-Z]*$"
            },
          "type": {
            "enum": [
              "select", "radio", "checkBox","multiselect","oneToMany","manyToMany"
            ]
          },
          "dataProperty": {"$ref": "/dataPropScheema"}
        },
        "required": ["tableName","type","dataProperty"]
      };    
      var tblSchema = {
        "id": "/tblScheema",
        "type": "object",
        "properties": {
          "tableName": {
              "type": "string",
              "pattern": "^[A-Z][a-zA-Z]*$"
          },
          "columns": {
            "type": "array",
            "items": {"$ref": "/tblColumn"},
            "uniqueItems": true
          },
          "relations": {
            "type": "array",
            "items": {"$ref": "/tblRelation"},
            "uniqueItems": true
          },
        },
        "required": ["tableName","columns"]
      };

      var crudGenSchema = {
        "id": "/crudGenSchema",
        "type": "object",
        "properties": {
          "databaseName": {
              "type": "string"
          },
          "applicationName": {
            "type": "string"
          },
          "applicationTheme": {
            "enum": [
              "dark", "defaultLight", "electricBlue","purplePlum"
            ]
          },
          "crudSchema": {
            "type": "array",
            "items": {"$ref": "/tblScheema"},
            "uniqueItems": true
          }
        },
        "required": ["crudSchema"]
      };
      // //can be used as dummy crudScheema to test this method
      // var testScheema = [
      //   {
      //     "tableName":"Product",
      //     "columns":[
      //         {"label":"Name","type":"text","required":true},
      //     ]
      //   },
      //   {
      //     "tableName":"User",
      //     "columns":[
      //       {"label":"Name","type":"text","required":true},
      //     ]
      //   }
      // ];

      validator.addSchema(dataPropScheema, '/dataPropScheema');
      validator.addSchema(columnsScheema, '/tblColumn');
      validator.addSchema(relationsScheema, '/tblRelation');
      validator.addSchema(tblSchema, '/tblScheema');
      let errors = validator.validate(scheema, crudGenSchema);
      if(errors != "" ){
        return errors; 
      }
      else{ //check if the user has made the correct relations b/w tables
        var crudSchema = scheema["crudSchema"];   
        for (var objectId in crudSchema) {   // in case of relation there are two tables first table makes relation with second so
          //var tableColumns = crudSchema[objectId].columns; 
          var tableRelations = crudSchema[objectId].relations; //took the first table relations object
          //var tableColumnType = "", error = ""; 
          var tableName = crudSchema[objectId].tableName; 
          
          if( tableName.toLowerCase() == "user"){
              errors += '0: "'+ tableName +'" is not a valid tableName as this will be generated automatically, please use something else.';
              return errors;   
          }
          
          for (var relationId in tableRelations) { //access each relation 

            var relationTblName = tableRelations[relationId].tableName; 
            var dataProperty = tableRelations[relationId].dataProperty; // releation table ref name,type fields
            let scheemaFound = false;

            for (var innerObjectId in crudSchema) { //traverse through all the tables

              var InnerTableName = crudSchema[innerObjectId].tableName; //and get table name
              var InnerTableColumns = crudSchema[innerObjectId].columns;  //columns

              if( relationTblName == InnerTableName && innerObjectId == objectId){ //if user try to make a table relation with itself
                errors += "0: A table cannot have relation with it self please use other tableName on instance["+objectId+"].relations["+relationId+"].";
                return errors;
              }

              if( relationTblName == InnerTableName ){ // if table exist i.e we can make realtion

                for (var columnId in InnerTableColumns) { //then iterate through its columns and look for if the dataProperty.name matches
                  var innerTableColumnLabel = InnerTableColumns[columnId].label; // and label of each

                  if(innerTableColumnLabel == dataProperty.name){ //matched so found
                    scheemaFound = true;
                    break;   
                  }
                }
                if(!scheemaFound){ //so scheema not found
                    errors += "0: invalid column name used on dataProperty of instance.crudSchema["+objectId+"].relations["+relationId+"], please specify name of column that exist in "+relationTblName+" scheema.";
                    return errors;
                }
               
                scheemaFound = false; //set it false so we can reuse it to check for dataProperty.type

                for (var columnId in InnerTableColumns) { //then iterate through its columns and look for if the dataProperty.type matches
                  var innerTableColumnLabel = InnerTableColumns[columnId].label; // and label of each
                  var innerTableColumnType = InnerTableColumns[columnId].type; //get type 
                  if(innerTableColumnLabel == dataProperty.name && innerTableColumnType == dataProperty.type){ //match for both name and type as both should belong to same instance
                    scheemaFound = true;
                    break;   
                  }
                  
                }
                if(!scheemaFound){ //so scheema not found
                  errors += "0: invalid column type used on dataProperty of instance.crudSchema["+objectId+"].relations["+relationId+"], please specify type coresponding to column "+ dataProperty.name+ " you specified from the "+relationTblName+" scheema. ";
                  return errors;
                }
                break;
              }

              else if(relationTblName.toLowerCase() == "user"){
                if( 
                    !(
                      dataProperty.name == "name" || dataProperty.name == "email" ||
                      dataProperty.name == "password"
                    )
                ){
                  errors += "0: invalid column name : "+dataProperty.name+" is used on instance.crudSchema["+objectId+"].relations["+relationId+"], "+relationTblName+" table only has name,email,password fields so use any of these.";
                  return errors;
                }

                else if(dataProperty.type != "text"){
                  errors += "0: invalid column type: "+dataProperty.type+" is used on instance.crudSchema["+objectId+"].relations["+relationId+"], please use the type text.";
                  return errors;  
                }

                scheemaFound = true;
                break;   
              }
              
            } 
          
            if(!scheemaFound){
              errors += "0: invalid tableName : "+relationTblName+" is used on instance.crudSchema["+objectId+"].relations["+relationId+"], please use name of the table that exists.";
              return errors;
            }

          }  
          
          //check if the valid/supported types are used for the columns(commented) because using builtin json scheema option 
          // for (var columnId in tableColumns) {
          //   tableColumnType = tableColumns[columnId].type;
          //   if( 
          //       !(
          //         tableColumnType.toLowerCase() == "text" || tableColumnType.toLowerCase() ==  ||
          //         tableColumnType.toLowerCase() == "text","number","email" || tableColumnType.toLowerCase() ==  ||
          //         tableColumnType.toLowerCase() == 
          //        )
          //     ){
          //     error += "0: unsupported type: "+tableColumnType+" is used on instance["+objectId+"].columns["+columnId+"]";
          //     return error;  
          //   }
          // }

          // for (var relationId in tableRelations) {
          //   let relationType = tableRelations[relationId].type;
          //   if( 
          //       !(
          //         relationType.toLowerCase() == "onetomany" || relationType.toLowerCase() == "manytomany" ||
          //         relationType.toLowerCase() == "select" || relationType.toLowerCase() == "radio" ||
          //         relationType.toLowerCase() == "checkbox"  || relationType.toLowerCase() == "multiselect"
          //        )
          //     ){
          //     error += "0: unsupported type: "+relationType+" is used on instance["+objectId+"].columns["+relationId+"]";
          //     return error;  
          //   }
          // }         
        }
        return "";            
      }
    }
}

module.exports = CRUDGeneratorService;







