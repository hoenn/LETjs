var main = function(){
    if(arg == 'AST'){
        showAST = true;
    }
    const repl = require('readline').createInterface({
        prompt: "LET> ",
        input: process.stdin,
        output: process.stdout
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
                console.log(pgm);
            console.log(INTERP.valueOf(pgm, replEnv, replSto));
        } 
        catch(e){
            console.log("Invalid Syntax");
        }
        finally{
            repl.prompt();
        }
    });

    repl.on('close', ()=> {
        console.log("Exiting...");
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
var replEnv = require("./Environment.js").emptyEnv();
var replSto = new require("./Store.js").Store();
var INTERP = require("./Interp.js");
var parser = require("./LET.js").parser;
var showAST = false;
var arg = process.argv[2];

if(require.main === module) {
    main();
}
