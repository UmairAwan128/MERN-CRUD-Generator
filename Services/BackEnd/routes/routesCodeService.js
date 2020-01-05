let instance = null;

class routesCodeService {
  constructor() {} //i am also here if you need me

  static getInstance() {
    if (!instance) {
      instance = new routesCodeService();
    }
    return instance;
  }

  GetRouteModelCode(scheema) {
    let tblName = scheema.tableName;
    var modelFileCode = this.getImports(scheema); //imports
    modelFileCode += this.getIndexRoute(tblName); 
    modelFileCode += this.getSpecificRecordRoute(scheema); 
    modelFileCode += this.getPostRoute(scheema); 
    modelFileCode += this.getDeleteRecordRoute(tblName); 
    modelFileCode += this.getPutRoute(scheema); 
    modelFileCode += this.getExpots();
    return modelFileCode;
  }

  getImports(scheema) {
    let imprtStatmnts = 'const express = require("express");\n';
    imprtStatmnts += 'const router = express.Router(); \n';
    imprtStatmnts += 'const verify = require("./verifyToken"); \n';
    imprtStatmnts = imprtStatmnts.concat('const ' + scheema.tableName + ' = require("../models/'+ scheema.tableName +'");\n');
    if(scheema.hasOwnProperty('relations')){
      let tblRelations = scheema.relations;
      for (var index in tblRelations) {
        imprtStatmnts += 'const ' + tblRelations[index].tableName + '= require("../models/'+ tblRelations[index].tableName +'");\n'; 
      }
    }
    imprtStatmnts += '\n'; 
    return imprtStatmnts;
  }

  getIndexRoute(tblName) {
    let route = "";
    route += 'router.get("/", verify, async (req, res) => {\n';
    route = route.concat(
       '  try {\n'+
       '    const ' + tblName+'s' + ' = await '+ tblName +'.find();\n'+ 
       '    res.json('+ tblName+'s' +');\n'+
       '  } catch (ex) {\n'+
       '    res.status(400).json({ message: ex.message });'+"\n"+
       '  }\n});\n\n'
    ); 
    return route;
  }

  getSpecificRecordRoute(scheema) {
    let route = "";
    let tblName = scheema.tableName;
    let tblColumns = scheema.columns;
    
    route += 'router.get("/:id", verify, async (req, res) => {\n';
    route = route.concat(
       '  try {\n'+
       '    const ' + tblName.toLowerCase() + ' = await '+ tblName +'.findById(req.params.id);\n' 
    );

    if(scheema.hasOwnProperty('relations')){
      let tblRelations = scheema.relations;
      for (var index in tblRelations) {
        if(tblRelations[index].type.toLowerCase() == "checkbox"  || tblRelations[index].type.toLowerCase() == "multiselect"){
          route = route.concat(
            '    let '+tblRelations[index].tableName.toLowerCase()+'Ids = new Array();\n'+
            '    for(var i=0; i<' + tblName.toLowerCase() + '.'+tblRelations[index].tableName+'s.length; i++){\n'+ 
            '      '+tblRelations[index].tableName.toLowerCase()+'Ids.push(' + tblName.toLowerCase() + '.'+tblRelations[index].tableName+'s[i].Id);\n'+
            '    }\n' 
         );             
        }
      }        
    }

    route = route.concat('    res.json({\n');
    route = route.concat(
      "        _id: " +tblName.toLowerCase()+"._id,\n"
    );

    for (var column in tblColumns) {
      route = route.concat(
          "        " + tblColumns[column].label + ": " +tblName.toLowerCase()+"." +tblColumns[column].label+",\n"
      ); 
    }        

    if(scheema.hasOwnProperty('relations')){
      let tblRelations = scheema.relations;
      for (var index in tblRelations) {
        if(tblRelations[index].type.toLowerCase() == "select" || tblRelations[index].type.toLowerCase() == "radio"){
          route = route.concat(
            "        " + tblRelations[index].tableName + "Id: " +tblName.toLowerCase()+"." +tblRelations[index].tableName+".Id,\n"
          ); 
        }
        else if(tblRelations[index].type.toLowerCase() == "checkbox"  || tblRelations[index].type.toLowerCase() == "multiselect"){
          route = route.concat(
            "        " + tblRelations[index].tableName + "Ids: " +tblRelations[index].tableName.toLowerCase()+"Ids,\n" 
          );
        }

      }        
    }
    route = route.concat(
      "        createdAt: " +tblName.toLowerCase()+".createdAt"+"\n"
    );

    route = route.concat('    });\n'+
       '  } catch (ex) {\n'+
       '    res.status(400).json({ message: ex.message });'+"\n"+
       '  }\n});\n\n'
    ); 
    return route;
  }

  getPostRoute(scheema) {
    let route = "";
    let tblName = scheema.tableName;
    let tblColumns = scheema.columns;
    let tblRelations;
    route += 'router.post("/", verify, async (req, res) => {\n';
    route +='  try {\n';
    
    if(scheema.hasOwnProperty('relations')){
      let dataProperty;
      tblRelations = scheema.relations;
      for (var index in tblRelations) {
        dataProperty = tblRelations[index].dataProperty;
        if(tblRelations[index].type.toLowerCase() == "checkbox"  || tblRelations[index].type.toLowerCase() == "multiselect"){
          route = route.concat(
            '    let '+tblRelations[index].tableName.toLowerCase()+'s = new Array();\n'+
            '    for(var i=0; i<req.body.'+tblRelations[index].tableName+'Ids.length; i++){\n'+ 
            '      const '+tblRelations[index].tableName.toLowerCase()+' = await '+tblRelations[index].tableName+'.findById(req.body.'+tblRelations[index].tableName+'Ids[i]);\n'+
            '      '+tblRelations[index].tableName.toLowerCase()+'s.push(\n'+
            '        {\n'+ 
            '          Id: '+tblRelations[index].tableName.toLowerCase()+'._id,\n'+ 
            '          Name: '+tblRelations[index].tableName.toLowerCase()+'.'+dataProperty.name+'\n'+ 
            '        }\n'+ 
            '      );\n'+ 
            '    }\n' 
         );             
        }
        else if(tblRelations[index].type.toLowerCase() == "select" || tblRelations[index].type.toLowerCase() == "radio"){
          route += '    const ' + tblRelations[index].tableName.toLowerCase() + ' = await '+ tblRelations[index].tableName +'.findById(req.body.'+ tblRelations[index].tableName +'Id);\n'; 
        }
      }
    }

    route += "    const "+ tblName.toLowerCase() +" = new "+tblName+" ({\n";
    for (var column in tblColumns) {
      route = route.concat(
          "        " + tblColumns[column].label + ": " + "req.body." +tblColumns[column].label+","+ "\n"
      ); 
    }
    if(scheema.hasOwnProperty('relations')){
      let dataProperty;     
      tblRelations = scheema.relations;
      for (var index in tblRelations) {
          dataProperty = tblRelations[index].dataProperty;
          if(tblRelations[index].type.toLowerCase() == "checkbox" || tblRelations[index].type.toLowerCase() == "multiselect"){
            route = route.concat(
              "        " + tblRelations[index].tableName + "s: "  + tblRelations[index].tableName.toLowerCase() + "s,\n"
              );
          }
          else if(tblRelations[index].type.toLowerCase() == "select" || tblRelations[index].type.toLowerCase() == "radio"){
            route = route.concat(
            "        " + tblRelations[index].tableName + ": {\n" +
            "          Id: " +tblRelations[index].tableName.toLowerCase()+"._id,\n"+
            "          "+dataProperty.name+": " +tblRelations[index].tableName.toLowerCase()+"."+dataProperty.name+"\n"+
            "        },\n"
            );
          }
      }        
    }
    
    route += '    });\n';
    route = route.concat(
       '    const saved' + tblName + ' = await '+ tblName.toLowerCase() +'.save();\n'+ 
       '    res.status(200).json(saved'+ tblName +');\n'+
       '  } catch (ex) {\n'+
       '    res.status(400).json({ message: ex.message });'+"\n"+
       '  }\n});\n\n'
    ); 
    return route;
  }

  getDeleteRecordRoute(tblName) {
    let route = "";
    route += 'router.delete("/:id", verify, async (req, res) => {\n';
    route = route.concat(
       '  try {\n'+
       '    const removed' + tblName + ' = await '+ tblName +'.remove({ _id: req.params.id });\n'+ 
       '    res.json(removed'+ tblName +');\n'+
       '  } catch (ex) {\n'+
       '    res.status(400).json({ message: ex.message });'+"\n"+
       '  }\n});\n\n'
    ); 
    return route;
  }

  getPutRoute(scheema) {
    let tblName = scheema.tableName;
    let tblColumns = scheema.columns;
    let route = "";
    let tblRelations;
    route += 'router.put("/:id", verify, async (req, res) => {\n';
    route += '  try {\n';

    if(scheema.hasOwnProperty('relations')){
      let dataProperty;     
      tblRelations = scheema.relations;
      for (var index in tblRelations) {
        dataProperty = tblRelations[index].dataProperty;
        if(tblRelations[index].type.toLowerCase() == "checkbox" || tblRelations[index].type.toLowerCase() == "multiselect"){
          route = route.concat(
            '    let '+tblRelations[index].tableName.toLowerCase()+'s = new Array();\n'+
            '    for(var i=0; i<req.body.'+tblRelations[index].tableName+'Ids.length; i++){\n'+ 
            '      const '+tblRelations[index].tableName.toLowerCase()+' = await '+tblRelations[index].tableName+'.findById(req.body.'+tblRelations[index].tableName+'Ids[i]);\n'+
            '      '+tblRelations[index].tableName.toLowerCase()+'s.push(\n'+
            '        {\n'+ 
            '          Id: '+tblRelations[index].tableName.toLowerCase()+'._id,\n'+ 
            '          Name: '+tblRelations[index].tableName.toLowerCase()+'.'+dataProperty.name+'\n'+ 
            '        }\n'+ 
            '      );\n'+ 
            '    }\n' 
         );             
        }
        else if(tblRelations[index].type.toLowerCase() == "select" || tblRelations[index].type.toLowerCase() == "radio"){
          route += '    const ' + tblRelations[index].tableName.toLowerCase() + ' = await '+ tblRelations[index].tableName +'.findById(req.body.'+ tblRelations[index].tableName +'Id);\n'; 
        }
      }
    }


    route += "    const updated"+ tblName +" = await "+tblName+".updateOne(\n";
    route += "      { _id: req.params.id },\n      {\n        $set:{\n";
    for (var column in tblColumns) {
      route = route.concat(
        "             " + tblColumns[column].label + ": " + "req.body." +tblColumns[column].label+",\n"
      ); 
    }


    if(scheema.hasOwnProperty('relations')){
      let dataProperty;     
      tblRelations = scheema.relations;
      for (var index in tblRelations) {
          dataProperty = tblRelations[index].dataProperty;
          if(tblRelations[index].type.toLowerCase() == "checkbox" || tblRelations[index].type.toLowerCase() == "multiselect" ){
            route = route.concat(
              "        " + tblRelations[index].tableName + "s: "  + tblRelations[index].tableName.toLowerCase() + "s,\n"
              );
          }
          else if(tblRelations[index].type.toLowerCase() == "select" || tblRelations[index].type.toLowerCase() == "radio"){
            route = route.concat(
              "             " + tblRelations[index].tableName + ": {\n" +
              "              Id: " +tblRelations[index].tableName.toLowerCase()+"._id,\n"+
              "              "+dataProperty.name+": " +tblRelations[index].tableName.toLowerCase()+"."+dataProperty.name+"\n"+
              "             },\n"
            ); 
  
          }
      }        
    }

    route += '\n        }\n      }\n    );\n';
    route = route.concat(
       '    res.json(updated'+ tblName +');\n'+
       '  } catch (ex) {\n'+
       '    res.status(400).json({ message: ex.message });'+"\n"+
       '  }\n});\n\n'
    ); 
    return route;
  }

  getExpots() {
    let eportStatmnts = 'module.exports = router;';
    return eportStatmnts;
  }
}

module.exports = routesCodeService;
