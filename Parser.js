var INTERP = require("./Interp.js");
var ENV = require("./Environment.js");
var util = require('util');
var main = function(){
    //Create parser
    var parser = require("./LET.js").parser;
    //Parse argv[2] (User argument)
    var output = parser.parse(process.argv[2]);
    //Output
    var emptyEnv = new ENV.Env(null,null,null)
    var pgm = new AST.Pgm(output);
    console.log(util.inspect(pgm, true, null, true));
    console.log(INTERP.valueOf(pgm, emptyEnv));
}


if(require.main === module){
    main();
}
