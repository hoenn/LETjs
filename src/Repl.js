var main = function(){
    if(arg == 'AST'){
        showAST = true;
    }
    const repl = require('readline').createInterface({
        prompt: "LET> ",
        input: process.stdin,
        output: process.stdout,
        useColors: true
    });
    
    repl.prompt();

    repl.on('line', (line) => {
        //If input matches a quit value
        if(quitValues.indexOf(line) != -1){
            repl.close();
        }
        try {
            var pgm = new AST.Pgm(parser.parse(line));
            if(showAST)
                console.log(util.inspect(pgm, {depth: null}).green);
            var result = INTERP.valueOf(pgm, replEnv, replSto)
            console.log(result.show().blue);
        } 
        catch(e){
            console.log(e);
            console.log("Invalid Syntax".yellow);
        }
        finally{
            repl.prompt();
        }
    });

    repl.on('close', ()=> {
        console.log("Exiting...".red);
        process.exit(0);
    });
}
var quitValues = [
    ":q",
    "quit",
    "close",
    "exit"
];

var AST = require("./AST.js");
var STO = require("./Store.js");
var PRELUDE = require("./Prelude.js")
var replSto = new STO.Store()
var replEnv = require("./Environment.js").emptyEnv();
replEnv = PRELUDE.loadInitEnv(replEnv, replSto)
var INTERP = require("./Interp.js");
var parser = require("../grammar/LET.js").parser;
var showAST = false;
var arg = process.argv[2];
var util = require('util')
var colors = require('colors')

if(require.main === module) {
    main();
}
