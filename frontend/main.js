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

    $("#output").text(util.inspect(INTERP.valueOf(pgm, emptyEnv, emptySto)));
    
    //Treant Setup
    var simple_chart_config = {
      chart: {
        container: "#tree-simple",
      },
      nodeStructure: cAst
    }
    var myChart = new Treant(simple_chart_config, null, $);
}

function cleanAst(ast){
  //Create clean "parallel" representation of AST node
  var newAst = {};
  //Text property holds Treant req'd json obj with name property
  newAst.text = {"name": ast.name}
  //Init Treant Req'd children property
  newAst.children = []
  //For each element of this current node
  //Ex: LetExp
  //All components become children, then if they were parents they must be cleaned as well
  //Id   
  //Exp1 will have children
  //Exp2 will have children

  for(subNode in ast){
    if(subNode == 0){
      return;
    }
    //Always create a newNode to represent each subnode
    //If not a parent itself
    //Then add to children and give it a child of it's value
    if(isLeaf(subNode)){
      var newNode = {"text": subNode};
      //give it a child that contains it's value as a newNode
      for(val in subNode){
        newNode.children = [{"text": {"name": subNode+": "+ast[subNode]}}]
      }
      newAst.children.push(newNode);
    }
    else {
      var newNode = cleanAst(ast[subNode]);
      if(newNode != undefined)
        newAst.children.push(newNode);
    }

  }
  /*
  for(node in ast){
    if(isLeaf(ast[node])){
      var newNode = {"text": ast[node]};
      if(ast[node].hasOwnProperty("Int")){
        newNode.children = [{"text": {"name": ast[node]["Int"]}}]
      }
      else if (ast[node].hasOwnProperty("Id")){
        newNode.children = [{"text": {"name": ast[node]["Id"]}}]
      }
      newAst.children.push(newNode)

    }
    else if(node.startsWith("E")){
      newAst.children.push(cleanAst(ast[node]));
    }
    else if(node.startsWith("I")){
      newAst.children.push({"text": {"name": node+": "+ast[node], "Value": ast[node]}})
    }
  }*/
    
  
  return newAst;
}
function isLeaf(node){
  return node == "Param" || node == "Id" || node == "Int" // || other things that don't have children 
}

