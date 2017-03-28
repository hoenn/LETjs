var INTERP = require("./Interp.js");
var ENV = require("./Environment.js");
var STO = require("./Store.js");
var util = require('util');
var main = function(){
    //Create parser
    var parser = require("../grammar/LET.js").parser;
    //Parse argv[2] (User argument)
    var output = parser.parse(process.argv[2]);
    //Output
    var emptyEnv = new ENV.Env(null,null,null)
    var emptySto = new STO.Store();
    var pgm = new AST.Pgm(output);
    console.log(util.inspect(pgm, true, null, true));
    console.log(INTERP.valueOf(pgm, emptyEnv, emptySto));
}


if(require.main === module){
    main();
}
