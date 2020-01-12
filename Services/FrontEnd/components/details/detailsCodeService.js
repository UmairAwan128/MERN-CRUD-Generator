let instance = null;

class detailsCodeService {
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new detailsCodeService();
    }
    return instance;
  }

  GenerateDetailsFileCode(scheema) {
    let tblName = scheema.tableName;
    var formCode = this.getImports(scheema); //imports
    formCode += this.generateClassAndState(scheema);
    formCode += this.generatePopulateFormMethod(scheema);
    formCode += this.generateComponentDidMount(scheema); 
    formCode += this.generateSubmitMethod(scheema); 
    formCode += this.generateRenderMethod(scheema);
    formCode += this.generateCloseAndExport(tblName); 
    return formCode;
  }

  getImports(scheema) {
    let tblName = scheema.tableName;
    var code = 'import React, { Component } from "react";';
    code = code.concat('import { get'+ tblName +' } from "../services/'+ tblName.toLowerCase() +'Service";\n');
    if(scheema.hasOwnProperty('relations')){
      let tblRelations = scheema.relations;
      for (var index in tblRelations) {
        code += 'import { get' + tblRelations[index].tableName + 's } from "../services/'+ tblRelations[index].tableName.toLowerCase() +'Service";\n'; 
      }
    }
    code += '\n';
    return code;
  }

  generateClassAndState(scheema){
    let tblName = scheema.tableName;
    let tblColumns = scheema.columns;
    let code = 'class '+ tblName +'Details extends Component{\n\n';
    code += '  state = {\n';
    code += '    data: {'
    for (var column in tblColumns) {
      code = code.concat(
          ' '+ tblColumns[column].label + ': "",'
      );
    }
    if(scheema.hasOwnProperty('relations')){
      let tblRelations = scheema.relations;
      for (var index in tblRelations) {

        if( tblRelations[index].type.toLowerCase() == "checkbox" || tblRelations[index].type.toLowerCase() == "multiselect" || tblRelations[index].type.toLowerCase() == "manytomany"){
          code = code.concat(
            ' '+ tblRelations[index].tableName + 'Ids: [],'
          );
        }  
        else if(tblRelations[index].type.toLowerCase() == "radio" || tblRelations[index].type.toLowerCase() == "select" || tblRelations[index].type.toLowerCase() == "onetomany"){
          code = code.concat(
            ' '+ tblRelations[index].tableName + 'Id: "",'
          );  
        }
      }
    }
    code += ' },\n';
    if(scheema.hasOwnProperty('relations')){
      let tblRelations = scheema.relations;
      for (var index in tblRelations) {
        code += '    ' + tblRelations[index].tableName + 's: [],\n'; 
      }
    }
    code += '    errors: {}\n';
    code += '  };\n\n';
    return code;
  }

  generatePopulateFormMethod(scheema){
    let tblName = scheema.tableName;
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
    if(scheema.hasOwnProperty('relations')){
      let tblRelations = scheema.relations;
      for (var index in tblRelations) {
        code += '  async populate'+ tblRelations[index].tableName +'s() {\n';
        code += '    const { data: '+ tblRelations[index].tableName +'s } = await get'+ tblRelations[index].tableName +'s();\n';
        code += '    this.setState({ '+ tblRelations[index].tableName +'s: '+ tblRelations[index].tableName +'s });\n';
        code += '  }\n\n';
      }
    }
    return code;
  }

  generateComponentDidMount(scheema) {
    let code = '  async componentDidMount() {\n';
        code += '    await this.populateForm();\n';
        if(scheema.hasOwnProperty('relations')){
          let tblRelations = scheema.relations;
          for (var index in tblRelations) {
            code += '    await this.populate'+tblRelations[index].tableName+'s();\n';
          }
        }
        code += '  }\n\n'; 
    return code;
  }

  generateSubmitMethod(scheema) {
    let code = '  handleSubmit = async (event) => {\n';
        code += '    event.preventDefault();\n';
        code += '    this.props.history.push("/'+scheema.tableName.toLowerCase()+'s");\n';
        code += '  };\n\n';  
    return code;
  }
  
  generateRenderMethod(scheema) {
    let tblName = scheema.tableName;
    let tblColumns = scheema.columns;
    let code = '  render() {\n';
        code += '    return (\n';
        code += '      <div className="content">\n';
        code += '        <h1>'+tblName+' Details</h1>\n';
        code += '        <form onSubmit={this.handleSubmit}>\n\n';        
        
        for (var column in tblColumns) {
          code = code.concat(
              '          <div className="form-group">\n' +
              '              <label  className="form-control"> '+ tblColumns[column].label+ ' : '
              );
          if(tblColumns[column].type.toLowerCase() === "date"){
            code = code.concat('                {this.state.data["'+ tblColumns[column].label +'"].substring(0, 10)}\n');
          }
          else{
            code = code.concat('                {this.state.data["'+ tblColumns[column].label +'"]}\n');            
          }
          code = code.concat('              </label>\n');
          code = code.concat('          </div>\n');                                    
        }

        if(scheema.hasOwnProperty('relations')){
          let tblRelations = scheema.relations;
          let dataProperty;     
          for (var index in tblRelations) {
            dataProperty = tblRelations[index].dataProperty;
            if(tblRelations[index].type.toLowerCase() == "select" || scheema.hasOwnProperty('onetomany') || tblRelations[index].type.toLowerCase() == "radio"){
                  code = code.concat(
                  '          <div className="form-group">\n' +
                  '              <label  className="form-control"> Selected '+  tblRelations[index].tableName+ ' : \n'
                  );
                    code = code.concat('                  {this.state.'+tblRelations[index].tableName+'s.map('+tblRelations[index].tableName+' => \n');
                    code = code.concat('                      this.state.data["'+tblRelations[index].tableName+'Id"] == '+tblRelations[index].tableName+'._id ? " "+ '+tblRelations[index].tableName+'.'+dataProperty.name+' : ""\n');
                    code = code.concat('                  )}');
                    code = code.concat('              </label>\n');
                    code = code.concat('          </div>\n');                                           
            }
            else if(tblRelations[index].type.toLowerCase() == "checkbox" || tblRelations[index].type.toLowerCase() == "manytomany" || tblRelations[index].type.toLowerCase() == "multiselect"){
              code = code.concat(
                '          <div className="form-group">\n' +
                '              <label  className="form-control"> Selected '+  tblRelations[index].tableName+ ' : \n'
                );
                  code = code.concat('                  {this.state.'+tblRelations[index].tableName+'s.map('+tblRelations[index].tableName+' => \n');
                  code = code.concat('                      this.state.data["'+tblRelations[index].tableName+'Ids"].includes('+tblRelations[index].tableName+'._id) ? " "+ '+tblRelations[index].tableName+'.'+dataProperty.name+'+"," : ""\n');
                  code = code.concat('                  )}\n');
                  code = code.concat('              </label>\n');
                  code = code.concat('          </div>\n');                                           
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
