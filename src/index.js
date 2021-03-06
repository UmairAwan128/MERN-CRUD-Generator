#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const schemaService = require("../Services/schemaService");
const inquirer = require('inquirer');

const schemaServiceObj = schemaService.getInstance();
let onlyNodeApp = false;
inquirer
  .prompt([
  {
    type: 'list',
    name: 'projectType',
    message: 'Please specify the type of the project you want to generate?',
    choices: [
      "I want to generate complete React and Node App having Express API's",
      "I want to generate only Node App having Express API's",
      'I want empty react App with Admin Pannel'
    ],
  },
  ]).then(answers=>{
    
    if(answers.projectType == "I want to generate only Node App having Express API's"){
      onlyNodeApp = true;
    }
    
    switch (answers.projectType) {
      case "I want to generate complete React and Node App having Express API's":
      case "I want to generate only Node App having Express API's":
          inquirer
          .prompt([
          {
            type: 'list',
            name: 'schemaLocation',
            message: 'Please specify the location of your scheema file?',
            choices: [
              'Current Directory',
              'Other Directory'
            ],
          },
          ]).then(answers=>{
            switch (answers.schemaLocation) {
              case 'Current Directory':
                inquirer
                .prompt([
                  {
                    type: 'input',
                    name: 'fileName',
                    default: 'scheema.json',
                    message: 'Please enter the name of your file with extension?',
                    validate: function(fileName) {
                      var isFileNameValid = fileName.match(
                        /^([a-z_\-\s0-9]+)\.(txt|json)$/i
                      );
                      if (isFileNameValid) {
                        const compleFileName = path.join(process.cwd(), fileName);
                        if(!fs.existsSync(compleFileName)){ //if there is no such file
                          return 'There is no file with such name in current directory';
                        }
                        else{ // if file found
                          return generateAppFromSchema(compleFileName);
                        }
                      }
                      return 'Please specify a valid file having extension txt or json like like fileName.json';
                    }
                  }
                ]).then(answers=>{
                  //console.log("ans2 : "+answers.fileName);
                });   
                break;
              case 'Other Directory':
                inquirer
                .prompt([
                  {
                    type: 'input',
                    name: 'filePath',
                    message: 'Please specify the complete loction of your scheema file with name and extension?',
                    validate: function(compleFileName) {
                      var isFilePathValid = compleFileName.match(
                        /^([\w]\:)(\\[a-z_\-\s0-9\.]+)+\.(txt|json)$/i
                      );
                      if (isFilePathValid) {
                        if(!fs.existsSync(compleFileName)){ //if there is no such file
                          return 'There is no file with such name in current directory';
                        }
                        else{ // if file found
                          return generateAppFromSchema(compleFileName);
                        }
                      }
                      return 'Please enter a valid path having a file with extension json or txt like c:\\folderName\\fileName.json';
                    }
                  }
                ]).then(answers=>{
                  //console.log("ans2 : "+answers.filePath);
                });
                break;
              default:
                break;
            }
        });
        break;
      case 'I want empty react App with Admin Pannel':
        inquirer.prompt([
          {
            type: 'list',
            name: 'outProjectLocation',
            message: 'Where you want the App to be generated?',
            choices: [
              'Current Directory',
              'Other Directory'
            ],
          },
          ]).then(answers=>{
            switch (answers.outProjectLocation) {
              case 'Current Directory':
                schemaServiceObj.generateAdminPannel(process.cwd());
                break;
              case 'Other Directory':
                inquirer
                  .prompt([
                    {
                      type: 'input',
                      name: 'outputFolderPath',
                      message: 'Please specify the complete path of the folder where you want App to be generated?',
                      validate: function(folderPath) {
                        var isfolderPathValid = folderPath.match(
                          /^([\w]\:)(\\[a-z_\-\s0-9]+)+$/i
                        );
                        if (isfolderPathValid) {
                          if(!fs.existsSync(folderPath)){ //if there is no such file
                            return 'There is no such folder on the path provided, please enter name of folder that exists.';
                          }
                          else{ // if file found
                            schemaServiceObj.generateAdminPannel(folderPath);
                            return true;
                          }
                        }
                        return 'Please enter a valid path like like c:\\folderName';
                      }
                    }
                  ]).then(answers=>{
                  });
              break;
              default:
              break;
              }
          });
        break;
      default:
        break;
      }
  });                  


function generateAppFromSchema(compleFileName) {
  fs.readFile(compleFileName, 'utf8', function(err, scheema) {
    if (err) {
      console.log("Reading file failed due to following reasons :\n"+err.message);
    }
    else{
      if(IsSchemaValid(scheema)){
        const jsonSchema = JSON.parse(scheema);      
        inquirer.prompt([
          {
            type: 'list',
            name: 'outProjectLocation',
            message: 'Where you want the CRUD to be generated?',
            choices: [
              'Current Directory',
              'Other Directory'
            ],
          },
          ]).then(answers=>{
            switch (answers.outProjectLocation) {
              case 'Current Directory':
                schemaServiceObj.generateCRUDApp(jsonSchema, process.cwd(),onlyNodeApp);
                break;
              case 'Other Directory':
                inquirer
                  .prompt([
                    {
                      type: 'input',
                      name: 'outputFolderPath',
                      message: 'Please specify the complete path of the folder where you want CRUD to be generated?',
                      validate: function(folderPath) {
                        var isfolderPathValid = folderPath.match(
                          /^([\w]\:)(\\[a-z_\-\s0-9]+)+$/i
                        );
                        if (isfolderPathValid) {
                          if(!fs.existsSync(folderPath)){ //if there is no such file
                            return 'There is no such folder on the path provided, please enter name of folder that exists.';
                          }
                          else{ // if file found
                            schemaServiceObj.generateCRUDApp(jsonSchema,folderPath,onlyNodeApp);
                            return true;
                          }
                        }
                        return 'Please enter a valid path like like c:\\folderName';
                      }
                    }
                  ]).then(answers=>{
                  });
              break;
              default:
              break;
              }
        });             
      }
      else{
        console.log("Scheema Provided is not a valid Json Object.");
      }
    }
  });

  return true;
}


function IsSchemaValid(schema) {
    try {
        JSON.parse(schema);
    } catch (e) {
        return false;
    }
    return true;
}