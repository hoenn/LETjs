var main = function(){
    var env1 = ENV.Env(null,null,null);
    var var1 = new AST.VarExp('a');
    var val1 = new AST.ConstExp(0);
    var zero1 = new AST.IsZeroExp(var1);
    var let1 = new AST.LetExp ('a', val1,zero1);
    console.log(let1);
    // let a = 0 in zero? a
    console.log(INTERP.valueOf(let1, env1));

    var env2 = new ENV.Env(null,null,null);
    var val2 = new AST.ConstExp(5);
    var val3 = new AST.ConstExp(6);
    var diff1 = new AST.DiffExp(val2, val3);
    console.log(diff1);
    // -(5,6)
    console.log(INTERP.valueOf(diff1, env2));

    var env3 = new ENV.Env(null,null,null);
    var val4 = new AST.ConstExp(3);
    var zero2 = new AST.IsZeroExp(val4);
    var val5 = new AST.ConstExp(1);
    var val6 = new AST.ConstExp(0);
    var if1 = new AST.IfExp(zero2, val5, val6)
    //if 3 isZero? then 1 else 0
    console.log(INTERP.valueOf(if1, env3));
}

var AST = require("../src/AST.js");
var ENV = require("../src/Environment.js");
var INTERP = require("../src/Interp.js");
if(require.main === module) {
    main();
}
