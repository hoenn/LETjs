var INTERP = require("./Interp.js");
var ENV = require("./Environment.js");
var main = function(){
    //Create parser
    var parser = require("./LET.js").parser;
    //Parse argv[2] (User argument)
    var output = parser.parse(process.argv[2]);
    //Output
    var emptyEnv = new ENV.Env(null,null,null)
    console.log(INTERP.valueOf(output));
}


if(require.main === module){
    main();
}
