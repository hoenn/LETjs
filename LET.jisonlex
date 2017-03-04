
/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
"let"                 return 'LET'
"in"                  return 'IN'
"if"                  return 'IF'
"then"                return 'THEN'
"else"                return 'ELSE'
"="                   return 'ASSIGN'
"zero?"               return 'ZERO'
"-"                   return 'MINUS'
"("                   return 'LPAREN'
")"                   return 'RPAREN'
","                   return 'COMMA'
[0-9]+                return 'NUMBER'
[a-zA-Z0-9]+          return 'ID'
<<EOF>>               return 'EOF'

