
var $ = require('jquery');
var util = require('util');
var INTERP = require("../src/Interp.js");
var ENV = require("../src/Environment.js");
var STO = require("../src/Store.js");
var AST = require("../src/AST.js");
var parser = require("../grammar/LET.js").parser;

window.parse = function(){
    var input = $("#user").val();
    var emptyEnv = ENV.emptyEnv();
    var emptySto = new STO.Store();
    var output = parser.parse(input);
    var pgm = new AST.Pgm(output);
    var cAst = cleanAst(pgm);
    console.log(util.inspect(pgm, {depth:null}));
    cAst["name"] = "Program"
    $("#ast").text(util.inspect(cAst, { depth:null}));
    $("#output").text(util.inspect(INTERP.valueOf(pgm, emptyEnv, emptySto)));
}

function cleanAst(ast){
  var newAst = {};
  newAst.name = ast.name
  newAst.children = []
  //If there are children
  
  for(node in ast){
    if(isLeaf(ast[node])){
      console.log(ast[node])
      newAst.children.push(ast[node])
    }
    else if(node.startsWith("E")){
      newAst.children.push(cleanAst(ast[node]));
    }
    else if(node.startsWith("I")){
      newAst.children.push({"name": node, "Value": ast[node]})
    }
  }
    
  
  return newAst;
}
function isLeaf(node){
  //A node is a leaf if
  //It is a const or var exp
  return node.name == "ConstantExpr" || node.name == "VariableExpr"
}

