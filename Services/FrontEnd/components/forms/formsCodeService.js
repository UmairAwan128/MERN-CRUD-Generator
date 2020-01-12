const fs = require("fs");
var path = require("path");
const CRUDConfigurations = require("../../../../CRUD_Config");

let instance = null;
let FormFolderPath = __dirname + "../../../../../"+ CRUDConfigurations.reactAppCodeFolderName +"/components/form";

class formsCodeService {
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new formsCodeService();
    }
    return instance;
  }

  GenerateFormCode(scheema) {
    let tblName = scheema.tableName;
    var formCode = this.getImports(scheema); //imports
    formCode += this.generateClassAndState(scheema);
    formCode += this.generateJoiScheema(scheema);
    formCode += this.generatePopulateFormMethod(scheema);
    formCode += this.generateComponentDidMount(scheema); 
    formCode += this.getFormMethods(scheema);//
    formCode += this.generateSubmitMethod(scheema); 
    formCode += this.generateRenderMethod(scheema);
    formCode += this.generateCloseAndExport(tblName); 
    return formCode;
  }

  getImports(scheema) {
    let tblName = scheema.tableName;
    var filePath = FormFolderPath + "/imports.txt";
    var code = fs.readFileSync(path.resolve(filePath), "utf8");
    code = code.concat('import { save'+ tblName +', get'+ tblName +' } from "../services/'+ tblName.toLowerCase() +'Service";\n');
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
    let code = 'class create'+ tblName +' extends Component{\n\n';
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

        if( tblRelations[index].type.toLowerCase() == "checkbox" || tblRelations[index].type.toLowerCase() == "multiselect" || tblRelations[index].type.toLowerCase() == "manytomany" ){
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

  generateJoiScheema(scheema){
    let tblColumns = scheema.columns;
    let typeMethod = "";
    let requiredMethod = "";
    let code = '  scheema = {\n';
    code += '    _id: Joi.string(),\n';
    for (var column in tblColumns) {
      typeMethod = this.getJoiTypeMethod(tblColumns[column].type);
      if(tblColumns[column].hasOwnProperty('required')){
        if(tblColumns[column].required === true){
          requiredMethod =  "      .required()\n";       
        }
        else{
          if(tblColumns[column].type !== "number"){
            requiredMethod =  "      .allow('').allow(null)\n";       
          }
        }
      }
      else{
        if(tblColumns[column].type !== "number"){
          requiredMethod = "      .allow('').allow(null)\n";     
        } 
      }
      code = code.concat(
        '    ' + tblColumns[column].label + ':  Joi.' + typeMethod + '\n' +  requiredMethod + 
        '      .label("'+ tblColumns[column].label +'"),\n'
      );
      requiredMethod = "";
    }

    if(scheema.hasOwnProperty('relations')){
      let tblRelations = scheema.relations;
      for (var index in tblRelations) {
        if(tblRelations[index].type.toLowerCase() == "checkbox" || tblRelations[index].type.toLowerCase() == "multiselect" || tblRelations[index].type.toLowerCase() == "manytomany"){
          code = code.concat(
            '    ' + tblRelations[index].tableName + 'Ids:  Joi.array()\n'+ 
            '      .label("'+ tblRelations[index].tableName +'Ids"),\n'
          );
        }  
        else if(tblRelations[index].type.toLowerCase() == "radio" || tblRelations[index].type.toLowerCase() == "select" || tblRelations[index].type.toLowerCase() == "onetomany"){
          code = code.concat(
            '    ' + tblRelations[index].tableName + 'Id:  Joi.string()\n'+ 
            '      .required()\n'+
            '      .label("'+ tblRelations[index].tableName +'Id"),\n'
          );
        }
      }
    }

    code += '    createdAt: Joi.date()\n';
    code += '      .label("createAt")\n';
    code += '  };\n\n';
    return code;
  }
  
  getJoiTypeMethod(scheemaType){
    if(scheemaType == "number"){
       return "number()"; 
    }
    else if(scheemaType == "text" || scheemaType == "password"){
      return "string()"; 
    }
    else if(scheemaType == "date"){
      return "date()"; 
    }
    else if(scheemaType == "email"){
      return "string().email()"; 
    }
    else if(scheemaType == "bool"){
      return "boolean()";
    }
  } 
  
  generatePopulateFormMethod(scheema){
    let tblName = scheema.tableName;
    let code = '  async populateForm() {\n';
    code += '    try {\n';
    code += '      const '+ tblName.toLowerCase() +'Id = this.props.match.params.id;\n';
    code += '      if('+tblName.toLowerCase()+'Id!=="new"){\n';
    code += '        const { data } = await get'+tblName+'('+ tblName.toLowerCase() +'Id);\n';
    code += '        this.setState({ data });\n';
    code += '      }    \n';
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

  getFormMethods() {
    var filePath = FormFolderPath + "/formMethods.txt";
    var code = fs.readFileSync(path.resolve(filePath), "utf8");
    return code;
  }

  generateSubmitMethod(scheema) {
    let code = '  handleSubmit = async (event) => {\n';
        code += '    event.preventDefault();\n';
        code += '    const errors = this.validate();\n';
        code += '    this.setState({ errors: errors ? errors : {} });\n'; 
        code += '    if (errors) return;\n'; 
        code += '    await save'+scheema.tableName+'(this.state.data);\n';
        code += '    this.props.history.push("/'+scheema.tableName.toLowerCase()+'s");\n';
        code += '  };\n\n';
        
        if(scheema.hasOwnProperty('relations')){
          let tblRelations = scheema.relations;
          for (var index in tblRelations) {
            if(tblRelations[index].type.toLowerCase() == "checkbox"){
              code += '  handleCheckBoxChange = event => {\n';
              code += '    const data = { ...this.state.data };\n';
              code += '    if(event.currentTarget.checked===true){\n';
              code += '      data[event.currentTarget.name].push(event.currentTarget.value);\n';
              code += '    }\n';
              code += '    else{\n';
              code += '      data[event.currentTarget.name] = data[event.currentTarget.name].filter(function(current){\n';
              code += '     return current !== event.currentTarget.value;\n';
              code += '     });\n';
              code += '   }\n';
              code += '     this.setState({ data: data});\n';
              code += '  };\n\n';
              break;
            }
            else if(tblRelations[index].type.toLowerCase() == "multiselect" || tblRelations[index].type.toLowerCase() == "manytomany"){
              code += '  handleMultiSelectChange = event => {\n';
              code += '    const data = { ...this.state.data };\n';
              code += '    var options = event.target.options;\n';
              code += '    data[event.currentTarget.name] = []; //remove old selected values\n';
              code += '    for (var i = 0, l = options.length; i < l; i++) {\n';
              code += '      if (options[i].selected) { //add new selected values\n';
              code += '        data[event.currentTarget.name].push(options[i].value); \n';
              code += '      }\n';
              code += '    }\n';
              code += '    this.setState({ data: data});\n';
              code += '  };\n\n';
              break;
            }
          }
        }
        
    return code;
  }
  
  generateRenderMethod(scheema) {
    let tblName = scheema.tableName;
    let tblColumns = scheema.columns;
    let code = '  render() {\n';
        code += '    return (\n';
        code += '      <div className="content">\n';
        code += '        <h1>'+tblName+' Form</h1>\n';
        code += '        <form onSubmit={this.handleSubmit}>\n\n';        
        for (var column in tblColumns) {
          code = code.concat(
              '          <div className="form-group">\n' +
              '              <label htmlFor="'+ tblColumns[column].label +'">' +
                                    tblColumns[column].label + "</label>\n" +
              '              <input' + '\n'
              );
          if(tblColumns[column].type.toLowerCase() === "date"){
            code = code.concat('                value={this.state.data["'+ tblColumns[column].label +'"].substring(0, 10)}\n');
          }
          else{
            code = code.concat('                value={this.state.data["'+ tblColumns[column].label +'"]}\n');            
          }
          code = code.concat(
            '                onChange={this.handleChange}\n'+
            '                name="'+tblColumns[column].label+'"\n'+
            '                id="'+tblColumns[column].label+'"\n'+
            '                type="'+tblColumns[column].type+'"\n'+
            '                className="form-control"\n'+
            '              />\n'+
            '              {this.state.errors["'+tblColumns[column].label+'"] && <div className="alert alert-danger">{this.state.errors["'+tblColumns[column].label+'"]}</div>}\n'+
            '          </div>\n\n'
           );
              
        }
        if(scheema.hasOwnProperty('relations')){
          let tblRelations = scheema.relations;
          let dataProperty;     
          for (var index in tblRelations) {
            dataProperty = tblRelations[index].dataProperty;
            if(tblRelations[index].type.toLowerCase() == "select" || tblRelations[index].type.toLowerCase() == "onetomany"){
                code = code.concat(
                  '          <div className="form-group">\n' +
                  '              <label htmlFor="'+  tblRelations[index].tableName +'Id">' +
                                  'Select ' + tblRelations[index].tableName + "</label>\n" +
                  '              <select' + '\n' +
                  '                value={this.state.data["'+ tblRelations[index].tableName +'Id"]}\n'+
                  '                onChange={this.handleChange}\n'+
                  '                name="'+tblRelations[index].tableName+'Id"\n'+
                  '                id="'+tblRelations[index].tableName+'Id"\n'+
                  '                className="form-control"\n'+
                  '                  >\n'+
                  '                  <option value="" disabled defaultValue>\n'+
                  '                     Select '+tblRelations[index].tableName+'\n'+
                  '                  </option>\n'+
                  '                  {this.state.'+tblRelations[index].tableName+'s.map('+tblRelations[index].tableName+' => (\n'+
                  '                    <option key={'+tblRelations[index].tableName+'._id} value={'+tblRelations[index].tableName+'._id}>\n'+
                  '                      {'+tblRelations[index].tableName+'.'+dataProperty.name+'}\n'+
                  '                    </option>\n'+
                  '                  ))}\n'+              
                  '              </select>\n'+
                  '              {this.state.errors["'+tblRelations[index].tableName+'Id"] && <div className="alert alert-danger">{this.state.errors["'+tblRelations[index].tableName+'Id"]}</div>}\n'+
                  '          </div>\n\n'
                  );
            }
            else if(tblRelations[index].type.toLowerCase() == "radio"){
                code = code.concat(
                  '          <div className="form-group">\n' +
                  '            <section className="section-preview">\n' +
                  '              <label className="mr-2">'+tblRelations[index].tableName +" "+ dataProperty.name +' : </label> \n' + 
                  '              {this.state.'+tblRelations[index].tableName+'s.map('+tblRelations[index].tableName+' => (\n' +
                  '                  <div key={'+tblRelations[index].tableName+'._id} className="custom-control custom-radio custom-control-inline">\n' +
                  '                    <input \n' +
                  '                      type="radio" value={'+tblRelations[index].tableName+'._id} onChange={this.handleChange} \n' +
                  '                      className="custom-control-input" id={'+tblRelations[index].tableName+'._id} name="'+tblRelations[index].tableName+'Id" \n' +
                  '                      checked = {this.state.data["'+tblRelations[index].tableName+'Id"] === '+tblRelations[index].tableName+'._id ? true:false}\n' +
                  '                    />\n' +
                  '                    <label className="custom-control-label" htmlFor={'+tblRelations[index].tableName+'._id}>{'+tblRelations[index].tableName+'.'+dataProperty.name+'}</label>\n' +
                  '                  </div>\n' +
                  '                ))}\n' +
                  '            </section>\n' +
                  '          </div> \n'
                );
            }
            else if(tblRelations[index].type.toLowerCase() == "checkbox"){
              code = code.concat(
                '          <div className="form-group">\n'+
                '              <label htmlFor="'+tblRelations[index].tableName+'Ids">Select '+tblRelations[index].tableName+'s</label>\n'+
                '              <section className="section-preview form-group">\n'+
                '                  {this.state.'+tblRelations[index].tableName+'s.map('+tblRelations[index].tableName+' => (\n'+
                '                    <div key={'+tblRelations[index].tableName+'._id} className="custom-control custom-checkbox custom-control-inline">\n'+
                '                        <input \n'+
                '                          type="checkbox" value={'+tblRelations[index].tableName+'._id} onChange={this.handleCheckBoxChange}\n'+
                '                          className="custom-control-input" id={'+tblRelations[index].tableName+'._id} name="'+tblRelations[index].tableName+'Ids"\n'+
                '                          checked = {this.state.data["'+tblRelations[index].tableName+'Ids"].includes('+tblRelations[index].tableName+'._id)}\n'+
                '                        />\n'+
                '                        <label className="custom-control-label" htmlFor={'+tblRelations[index].tableName+'._id}>{'+tblRelations[index].tableName+'.'+dataProperty.name+'}</label>\n'+
                '                    </div>\n'+
                '                  ))}\n'+
                '              </section>\n'+
                '          </div>\n'
              );
            }
            else if(tblRelations[index].type.toLowerCase() == "multiselect"  || tblRelations[index].type.toLowerCase() == "manytomany"){
              code = code.concat(
                '          <div className="form-group">\n' +
                '              <label htmlFor="'+  tblRelations[index].tableName +'Ids">' +
                                'Select ' + tblRelations[index].tableName + "</label>\n" +
                '              <select' + '\n' +
                '                value={this.state.data["'+ tblRelations[index].tableName +'Id"]}\n'+
                '                onChange={this.handleMultiSelectChange}\n'+
                '                multiple\n'+
                '                name="'+tblRelations[index].tableName+'Ids"\n'+
                '                id="'+tblRelations[index].tableName+'Ids"\n'+
                '                className="form-control"\n'+
                '                  >\n'+
                '                  {this.state.'+tblRelations[index].tableName+'s.map('+tblRelations[index].tableName+' => (\n'+
                '                    <option \n'+
                '                       key={'+tblRelations[index].tableName+'._id} value={'+tblRelations[index].tableName+'._id}\n'+
                '                       selected = {this.state.data["'+tblRelations[index].tableName+'Ids"].includes('+tblRelations[index].tableName+'._id)}>\n'+
                '                      {'+tblRelations[index].tableName+'.'+dataProperty.name+'}\n'+
                '                    </option>\n'+
                '                  ))}\n'+              
                '              </select>\n'+
                '          </div>\n\n'
                );
            }
           
          }
        }
        code += '          <button disabled={this.validate()} className="btn btn-primary custom-btn">Save</button>\n\n';        
        code +='        </form>\n';        
        code +='      </div>\n';        
        code +='    );\n';        
        code +='  }\n';        
    return code;
  }

  generateCloseAndExport(tblName) {
    let code = '}\n\n';
        code += 'export default create'+tblName+';';
    return code;
  }
  
}

module.exports = formsCodeService;
