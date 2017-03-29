
var $ = require('jQuery');
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
    $("#output").text(util.inspect(INTERP.valueOf(pgm, emptyEnv, emptySto)));
}

