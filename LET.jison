%start expressions

%% /* language grammar */

expressions
    : e EOF
        { //typeof console !== 'undefined' ? console.log($1) : print($1);
          return $1; }
    ;

e
    : NUMBER
        {$$ = new AST.ConstExp(Number($1));}
    | ID
        {$$ = new AST.VarExp($1);}
    | ZERO LPAREN e RPAREN
       {$$ = new AST.IsZeroExp($3);}
    | MINUS LPAREN e COMMA e RPAREN
       {$$ = new AST.DiffExp($3, $5);}
    | IF e THEN e ELSE e
        {$$ = new AST.IfExp($2, $4, $6);}
    | LET ID ASSIGN e IN e
        {$$ = new AST.LetExp($2, $4, $6);}
    ;

