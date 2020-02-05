let instance = null;

class detailsCodeService {
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new detailsCodeService();
    }
    return instance;
  }

  GenerateDetailsFileCode(schemaTable,schemaRelations) {
    let tblName = schemaTable.name;
    var formCode = this.getImports(schemaTable,schemaRelations); //imports
    formCode += this.generateClassAndState(schemaTable,schemaRelations);
    formCode += this.generatePopulateFormMethod(schemaTable,schemaRelations);
    formCode += this.generateComponentDidMount(tblName,schemaRelations); 
    formCode += this.generateSubmitMethod(tblName); 
    formCode += this.generateRenderMethod(schemaTable,schemaRelations);
    formCode += this.generateCloseAndExport(tblName); 
    return formCode;
  }

  getImports(schemaTable,schemaRelations) {
    let tblName = schemaTable.name;
    let firstTable,secondTable;
    var code = 'import React, { Component } from "react";\n';
    code = code.concat('import { get'+ tblName +' } from "../../services/'+ tblName.toLowerCase() +'Service";\n');
    if(schemaRelations != null){
      for (var index in schemaRelations) {
        firstTable = schemaRelations[index].firstTable; // get each realtions firstTable 
        if( tblName == firstTable){ // if its same as the currentTable i.e tblName then this relation belongs to current table
          secondTable = schemaRelations[index].secondTable; 
          code += 'import { get' + secondTable + 's } from "../../services/'+ secondTable.toLowerCase() +'Service";\n'; 
        }
      }
    }
    code += '\n';
    return code;
  }

  generateClassAndState(schemaTable,schemaRelations){
    let tblName = schemaTable.name;
    let tblColumns = schemaTable.columns;
    let firstTable,secondTable,relationType;
    let code = 'class '+ tblName +'Details extends Component{\n\n';
    code += '  state = {\n';
    code += '    data: {'
    for (var column in tblColumns) {
      code = code.concat(
          ' '+ tblColumns[column].name + ': "",'
      );
    }
    if(schemaRelations != null){
      for (var index in schemaRelations) {
        firstTable = schemaRelations[index].firstTable; // get each realtions firstTable 
        if( tblName == firstTable){ // if its same as the currentTable i.e tblName then this relation belongs to current table
          secondTable = schemaRelations[index].secondTable; 
          relationType = schemaRelations[index].relationType; 
          if( relationType.toLowerCase() == "checkbox" || relationType.toLowerCase() == "multiselect" || relationType.toLowerCase() == "manytomany"){
            code = code.concat(
              ' '+ secondTable + 'Ids: [],'
            );
          }  
          else if(relationType.toLowerCase() == "radio" || relationType.toLowerCase() == "select" || relationType.toLowerCase() == "onetomany"){
            code = code.concat(
              ' '+ secondTable + 'Id: "",'
            );  
          }
        }
      }
    }
    code += ' },\n';
    if(schemaRelations != null){
      for (var index in schemaRelations) {
        firstTable = schemaRelations[index].firstTable; // get each realtions firstTable 
        if( tblName == firstTable){ // if its same as the currentTable i.e tblName then this relation belongs to current table
          secondTable = schemaRelations[index].secondTable; 
          code += '    ' + secondTable + 's: [],\n'; 
        }
      }
    }
    code += '    errors: {}\n';
    code += '  };\n\n';
    return code;
  }

  generatePopulateFormMethod(schemaTable,schemaRelations){
    let tblName = schemaTable.name;
    let firstTable,secondTable;
    let code = '  async populateForm() {\n';
    code += '    try {\n';
    code += '        const '+ tblName.toLowerCase() +'Id = this.props.match.params.id;\n';
    code += '        const { data } = await get'+tblName+'('+ tblName.toLowerCase() +'Id);\n';
    code += '        this.setState({ data });\n';
    code += '    } \n';
    code += '    catch (ex) {\n';
    code += '      if (ex.response && ex.response.status === 404) {\n';
    code += '        this.props.history.replace("/not-found"); \n';
    code += '      }\n';
    code += '    }\n';
    code += '  }\n\n';
    if(schemaRelations != null){
      for (var index in schemaRelations) {
        firstTable = schemaRelations[index].firstTable; // get each realtions firstTable 
        if( tblName == firstTable){ // if its same as the currentTable i.e tblName then this relation belongs to current table
          secondTable = schemaRelations[index].secondTable; 
          code += '  async populate'+ secondTable +'s() {\n';
          code += '    const { data: '+ secondTable +'s } = await get'+ secondTable +'s();\n';
          code += '    this.setState({ '+ secondTable +'s: '+ secondTable +'s });\n';
          code += '  }\n\n';
        }
      }
    }
    return code;
  }

  generateComponentDidMount(tblName,schemaRelations) {
    let firstTable,secondTable;
    let code = '  async componentDidMount() {\n';
        code += '    await this.populateForm();\n';
        if(schemaRelations != null){
          for (var index in schemaRelations) {
            firstTable = schemaRelations[index].firstTable; // get each realtions firstTable 
            if( tblName == firstTable){ // if its same as the currentTable i.e tblName then this relation belongs to current table
              secondTable = schemaRelations[index].secondTable; 
              code += '    await this.populate'+secondTable+'s();\n';
            }
          }
        }
        code += '  }\n\n'; 
    return code;
  }

  generateSubmitMethod(tblName) {
    let code = '  handleSubmit = async (event) => {\n';
        code += '    event.preventDefault();\n';
        code += '    this.props.history.push("/'+tblName.toLowerCase()+'s");\n';
        code += '  };\n\n';  
    return code;
  }
  
  generateRenderMethod(schemaTable,schemaRelations) {
    let tblName = schemaTable.name;
    let tblColumns = schemaTable.columns;
    let firstTable,secondTable,relationType,secondTableColumn;

    let code = '  render() {\n';
        code += '    return (\n';
        code += '      <div className="content">\n';
        code += '        <h1>'+tblName+' Details</h1>\n';
        code += '        <form onSubmit={this.handleSubmit}>\n\n';        
        
        for (var column in tblColumns) {
          code = code.concat(
              '          <div className="form-group">\n' +
              '              <label  className="form-control"> '+ tblColumns[column].name+ ' : \n'
              );
          if(tblColumns[column].type.toLowerCase() === "date"){
            code = code.concat('                 {this.state.data["'+ tblColumns[column].name +'"].substring(0, 10)}\n');
          }
          else{
            code = code.concat('                 {this.state.data["'+ tblColumns[column].name +'"]}\n');            
          }
          code = code.concat('              </label>\n');
          code = code.concat('          </div>\n');                                    
        }

        if(schemaRelations != null){
          for (var index in schemaRelations) {
            firstTable = schemaRelations[index].firstTable; // get each realtions firstTable 
            if( tblName == firstTable){ // if its same as the currentTable i.e tblName then this relation belongs to current table
              secondTable = schemaRelations[index].secondTable; 
              relationType = schemaRelations[index].relationType; 
              secondTableColumn = schemaRelations[index].secondTableColumn;     
              if(relationType.toLowerCase() == "select" || relationType.toLowerCase() == "onetomany" || relationType.toLowerCase() == "radio"){
                    code = code.concat(
                    '          <div className="form-group">\n' +
                    '              <label  className="form-control"> Selected '+  secondTable+ ' : \n'
                    );
                      code = code.concat('                  {this.state.'+secondTable+'s.map('+secondTable+' => \n');
                      code = code.concat('                      this.state.data["'+secondTable+'Id"] == '+secondTable+'._id ? " "+ '+secondTable+'.'+secondTableColumn+' : ""\n');
                      code = code.concat('                  )}');
                      code = code.concat('              </label>\n');
                      code = code.concat('          </div>\n');                                           
              }
              else if(relationType.toLowerCase() == "checkbox" || relationType.toLowerCase() == "manytomany" || relationType.toLowerCase() == "multiselect"){
                code = code.concat(
                  '          <div className="form-group">\n' +
                  '              <label  className="form-control"> Selected '+  secondTable+ ' : \n'
                  );
                    code = code.concat('                   {this.state.'+secondTable+'s.map('+secondTable+' => \n');
                    code = code.concat('                       this.state.data["'+secondTable+'Ids"].includes('+secondTable+'._id) ? " "+ '+secondTable+'.'+secondTableColumn+'+"," : ""\n');
                    code = code.concat('                  )}\n');
                    code = code.concat('              </label>\n');
                    code = code.concat('          </div>\n');                                           
              }
            }
          }
        }
        code += '           <button className="btn btn-primary custom-btn">OK</button>\n\n';        
        code +='        </form>\n';        
        code +='      </div>\n';        
        code +='    );\n';        
        code +='  }\n';        
    return code;
  }

  generateCloseAndExport(tblName) {
    let code = '}\n\n';
        code += 'export default '+tblName+'Details;';
    return code;
  }
  
}

module.exports = detailsCodeService;