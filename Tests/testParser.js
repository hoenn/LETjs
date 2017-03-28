var main = function() {
    var passedTests = 0;
    var failedTests = [];
    for(var i = 0; i < tests.length; i++){
        if(testInput(tests[i])){
            passedTests += 1;
        }
        else{
            failedTests.push(tests[i].name);
        }
    }
    if(passedTests == tests.length){
        console.log("All tests passed!");
    }
    else{
        console.log(tests.length-passedTests+" tests have failed");
        console.log("Failing tests: "+failedTests);
    }
}


var tests = [{
    "name": "Positive Number Const",
    "input": "10",
    "assertion": "10"
},{
    "name": "Negative Number Const",
    "input": "-10",
    "assertion": "-10"
},{
    "name": "Diff Arith",
    "input": "-(1,2)",
    "assertion": "-1"
},{
    "name": "Add Arith",
    "input": "+(2,1)",
    "assertion": "3"
},{
    "name": "Times Arith",
    "input": "*(4,5)",
    "assertion": "20"
},{
    "name": "Nested Arith Left",
    "input": "-(+(1,2), 1)",
    "assertion": "2" 
},{
    "name": "Nested Arith Right",
    "input": "-(1, +(1,2))",
    "assertion": "-2" 
},{
    "name": "Let Positive Integer",
    "input": "let x = 5 in x",
    "assertion": "5"
},{
    "name": "Let Negative Integer",
    "input": "let x = -5 in x",
    "assertion": "-5"
}
]

var AST = require("../src/AST.js");
var INTERP = require("../src/Interp.js");
var emptyEnv = require("../src/Environment.js").emptyEnv();
const parser = require("../grammar/LET.js").parser;

function testInput(x){
    var pgm = new AST.Pgm(parser.parse(x.input));
    var output =INTERP.valueOf(pgm, emptyEnv).val;
    return x.assertion == output;
}
if(require.main === module){
    main();
}
