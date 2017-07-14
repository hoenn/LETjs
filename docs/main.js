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
    console.log(util.inspect(pgm, {depth:null}));

    var cAst = cleanAst(pgm);
    //Setup first node, singleton operation
    cAst["text"] = {"name": "Program"}
    console.log(util.inspect(cAst, {depth:null}));

    $("#output").text(INTERP.valueOf(pgm, emptyEnv, emptySto).val);

    //Treant Setup
    var simple_chart_config = {
      chart: {
        container: "#tree-simple",
        animateOnInit: true,
        animation: {
            nodeSpeed: 500
        }
      },
      nodeStructure: cAst
    }
    var myChart = new Treant(simple_chart_config, null, $);
}

function cleanAst(ast){
  //Create clean "parallel" representation of AST node
  var newAst = {};
  newAst.text = {"name": ast.name}
  newAst.children = []

  for(subNode in ast){
    if(subNode == 0){
      return;
    }
    if(isLeaf(subNode)){
      var newNode = {"text": {"name": subNode+": "+ast[subNode]}}
      newAst.children.push(newNode);
    } else if (isBeginExp(ast[subNode])) {
      newAst.children.push(handleBeginExp(ast[subNode]));
    }
    else {
      var newNode = cleanAst(ast[subNode]);
      if(newNode != undefined)
        newAst.children.push(newNode);
    }

  }
  return newAst;
}
function handleBeginExp(node) {
    var newNode = {"text": {"name": node.name}}
    newNode.children= [];
    var nodeArray = node["ExpSeq"]
    for (var i = 0; i < nodeArray.length; i++) {
        newNode.children.push(cleanAst(nodeArray[i]));
    }
    return newNode
}
function isLeaf(node){
  return node == "Param" || node == "Id" || node == "Int" || node == "Id1" || node == "Id2";
}

function isBeginExp(node) {
  return node.name == "BeginExpr";
}

