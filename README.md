# LETjs
LET is a programming language originally described in Scheme by Daniel P. Friedman and Mitchell Wand in [*Exploration of Programming Languages*](https://mitpress.mit.edu/books/essentials-programming-languages).

This is an implementation of LET created in JavaScript using [jison](https://github.com/zaach/jison) to generate the parser.

The LET language is a toy language with a very basic grammar. A program consists of a single expression which may be made up of multiple expressions itself. 

#### Examples of valid LET programs

```let x = 5 in x``` Result: 5

```let a = 3 in let y = 2 in -(x,y)``` Result: 1

```let x = 3 in let y = 3 in if zero?(-(x,y)) then 1 else 0``` Result: 1


## Installation
Clone the repository

```$ git clone https://github.com/Hoenn/LETjs.git```

Install dependencies (from within LETjs directory)

```$ npm install```

## Usage guide
The LET language can be interpreted using Repl.js. To launch the REPL

```$ node Repl.js```

Using the REPL

```LET> 5```

```LET> let x = 5 in x```

To see the Abstract Syntax Tree of your programs the REPL can be launched with  'AST' as an argument.

```$ node Repl.js AST```



## Recompilation
The LET.jison and LET.jisonlex files are the backbone of the language. If modified they must be recompiled with Jison to generate a new LET.js file.

To recompile LET.js

```$ jison LET.jison LET.jisonlex``` 

## Backus Naur Form Grammar
### Program
*Program*    :: *Expression*

### Expression
*Expression* :: Number

*Expression* :: Id
           
*Expression* :: "zero?" "(" *Expression* ")"
           
*Expression* :: "-" "(" *Expression* "," *Expression* ")" 
           
*Expression* :: "+" "(" *Expression* "," *Expression* ")" 

*Expression* :: "*" "(" *Expression* "," *Expression* ")" 

*Expression* :: "let" Id "=" *Expression* "in" *Expression*
           
*Expression* :: "if" *Expression* "then" *Expression* "else" *Expression*

*Expression* :: "proc" "(" Id ")" *Expression*

*Expression* :: "(" *Expression* " " *Expression* ")"
           
*Expression* :: "letrec" Id "(" Id ")" "=" *Expression* "in" *Expression*

*Expression* :: "begin" *ExprSeq* "end"

*Expression* :: "newref" "(" *Expression* ")" 

*Expression* :: "deref" "(" *Expression* ")"

*Expression* :: "setref" "(" *Expression* "," *Expression* ")"

### Expression Sequence
*ExprSeq* :: *Expression*

*ExprSeq* :: *Expression* ";" *ExprSeq*
