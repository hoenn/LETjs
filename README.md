##Implementation of Toy Language Let in JS using Jison

#Installation
Clone the repository
```$ git clone https://github.com/Hoenn/LETjs.git```

Install dependencies (from within LETjs directory)
```$ npm install```

#Usage guide
Currently running the Parser with node is the easiest way to run LET language code

Examples
```$ node Parser.js "let x = 5 in x"```

```$ node Parser.js "let x = 3 in y = 2 in -(x,y)```

#Recompilation
The LET.jison and LET.jisonlex files are the backbone of the language. If modified they must be recompiled with Jison to generate a new LET.js file.

To recompile LET.js
```$ jison LET.jison LET.jisonlex``` 

Dependence Injection (Temporary work around)
Then prepend ```var AST = require("./AST.js");``` to LET.js
