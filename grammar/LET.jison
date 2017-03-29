%start expressions

%% /* language grammar */

expressions
    : e EOF
        { //typeof console !== 'undefined' ? console.log($1) : print($1);
          return $1; }
    ;
pgm 
    : e PGM
        {$$ = new AST.Pgm($1);}
    ;

expseq 
    : e
       {$$ = [$1] }
    | e SEMICOLON expseq
       { var x = $3;
         x.unshift($1);
        $$ = x;}
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
    | PLUS LPAREN e COMMA e RPAREN
       {$$ = new AST.PlusExp($3, $5);}
    | TIMES LPAREN e COMMA e RPAREN
       {$$ = new AST.TimesExp($3, $5);}
    | IF e THEN e ELSE e
        {$$ = new AST.IfExp($2, $4, $6);}
    | LET ID ASSIGN e IN e
        {$$ = new AST.LetExp($2, $4, $6);}
    | PROC LPAREN ID RPAREN e
        {$$ = new AST.ProcExp($3, $5);}
    | LPAREN e e RPAREN
        {$$ = new AST.CallExp($2, $3);}
    | LETREC ID LPAREN ID RPAREN ASSIGN e IN e
        {$$ = new AST.LetRecExp($2, $4, $7, $9);}
    | BEGIN expseq END
        {$$ = new AST.BeginExp($2);}
    | SET ID ASSIGN e
        {$$ = new AST.ASsignExp($2, $4);}

    ;


