
/* description: Parses LET expressions*/

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
"letrec"              return 'LETREC'
"let"                 return 'LET'
"in"                  return 'IN'
"if"                  return 'IF'
"then"                return 'THEN'
"else"                return 'ELSE'
"="                   return 'ASSIGN'
"zero?"               return 'ZERO'
"proc"                return 'PROC'
"-"?[0-9]+            return 'NUMBER'
"-"                   return 'MINUS'
"+"                   return 'PLUS'
"*"                   return 'TIMES'
"("                   return 'LPAREN'
")"                   return 'RPAREN'
","                   return 'COMMA'
[a-zA-Z][a-zA-Z0-9\_\-\?\']*          return 'ID'
<<EOF>>               return 'EOF'

