#LETjs
LET is a programming language originally described in Scheme by Daniel P. Friedman and Mitchell Wand in [*Exploration of Programming Languages*](https://mitpress.mit.edu/books/essentials-programming-languages).

This is an implementation of LET created in JavaScript using [jison](https://github.com/zaach/jison) to generate the parser.

##Installation
Clone the repository

```$ git clone https://github.com/Hoenn/LETjs.git```

Install dependencies (from within LETjs directory)

```$ npm install```

##Usage guide
Currently running the Parser with node is the easiest way to run LET language code

Examples

```$ node Parser.js "let x = 5 in x"```

```$ node Parser.js "let x = 3 in y = 2 in -(x,y)```

##Recompilation
The LET.jison and LET.jisonlex files are the backbone of the language. If modified they must be recompiled with Jison to generate a new LET.js file.

To recompile LET.js

```$ jison LET.jison LET.jisonlex``` 

Dependence Injection (Temporary work around)
Then prepend ```var AST = require("./AST.js");``` to LET.js

##Backus Naur Form Grammar
*Program*    :: *Expression*

*Expression* :: Number

*Expression* :: Id
           
*Expression* :: "zero?" "(" *Expression* ")"
           
*Expression* :: "-" "(" *Expression* "," *Expression* ")" 
           
*Expression* :: "let" Id "=" *Expression* "in" *Expression*
           
*Expression* :: "if" *Expression* "then" *Expression* "else" *Expression*
           
