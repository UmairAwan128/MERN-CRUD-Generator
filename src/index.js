const fs = require("fs");
const path = require("path");
const schemaService = require("../Services/schemaService");
const inquirer = require('inquirer');

const schemaServiceObj = schemaService.getInstance();

inquirer
  .prompt([
  {
    type: 'list',
    name: 'projectType',
    message: 'Please specify the type of the project you want to generate?',
    choices: [
      'I want to generate React CRUD App',
      'I want empty react App with Admin Pannel'
    ],
  },
  ]).then(answers=>{
    switch (answers.projectType) {
      case 'I want to generate React CRUD App':
        inquirer
          .prompt([
          {
            type: 'list',
            name: 'schemaLocation',
            message: 'Please specify the location your scheema file?',
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
                      return 'Please specify a valid file having extension txt or json';
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
                      return 'Please enter a valid path having a file with extension json or txt';
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
                          schemaServiceObj.generateAdminPannel(folderPath);
                          return true;
                        }
                        return 'Please enter a valid path';
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
      console.log("Failed to read file.");
      console.log("reason : "+err.message);
    }
    else{
      const jsonSchema = JSON.parse(scheema);
      //console.log("\nYour schema: "+jsonSchema);
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
              schemaServiceObj.generateCRUDApp(jsonSchema, process.cwd());
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
                        schemaServiceObj.generateCRUDApp(jsonSchema, folderPath);
                        return true;
                      }
                      return 'Please enter a valid path';
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
  });

  return true;
}
