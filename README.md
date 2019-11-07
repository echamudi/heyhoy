# HEYHOY!

(WIP - Experimental) Damn simple programming language built using javascript from scratch (no jison, no bison).

> This project is created to me help studying recursive-descent top-down parser implementation.

> Only the lexer and syntax parser is working for the meantime.

## Language Grammar

Lexemes and Tokens

```
=           EQ_SIGN
*           MUL_SIGN
+           ADD_SIGN
[0-9]+      NUMBER
[a-z]+      IDENTIFIER
\n          NEW_LINE
```

Backus-Naur Form

```
<program> -> <statement> <program>
        | <statement> 
        | EOF

<statement> -> IDENTIFIER <action> NEW_LINE
        | NEW_LINE

<action> -> '=' <expression>            // Assign
        | IDENTIFIER                    // Function, can only take one argument

<expression> -> <factor> '+' <expression>
        | <factor>

<factor> -> <term> '*' <factor>
        | <term>

<term> -> NUMBER
        | IDENTIFIER
```

> Yes, currently this language currently only supports multiplication and addition on integer.
> Might be expanded further sometime...

## See Examples

```
git clone https://github.com/ezhmd/heyhoy.git
npm run test-verbose
cd heyhoy
npm install
npm run test-verbose
```

Result example:

```
Start Hey Hoy!
Inputted code:

x = 5
y = x * 5

print y

Tokens & Lexemes
[
  [ 2, '\n' ],    [ 0, 'x' ],
  [ 11, '=' ],    [ 1, '5' ],
  [ 2, '\n' ],    [ 0, 'y' ],
  [ 11, '=' ],    [ 0, 'x' ],
  [ 12, '*' ],    [ 1, '5' ],
  [ 2, '\n' ],    [ 2, '\n' ],
  [ 0, 'print' ], [ 0, 'y' ],
  [ 2, '\n' ],    [ 14, '' ]
]
Tokens & Lexemes
Initial Lex --->  [ 2, '\n' ]
 Enter Program
    Enter Statement
    Exit Statement
    Called Lex --->  [ 0, 'x' ]
    Enter Program
       Enter Statement
          Called Lex --->  [ 11, '=' ]
          Enter Action
             Called Lex --->  [ 1, '5' ]
             Enter Expression
                Enter Factor
                   Enter Term
                      Called Lex --->  [ 2, '\n' ]
                   Exit Term
                Exit Factor
             Exit Expression
          Exit Action
       Exit Statement
       Called Lex --->  [ 0, 'y' ]
       Enter Program
          Enter Statement
             Called Lex --->  [ 11, '=' ]
             Enter Action
                Called Lex --->  [ 0, 'x' ]
                Enter Expression
                   Enter Factor
                      Enter Term
                         Called Lex --->  [ 12, '*' ]
                      Exit Term
                      Called Lex --->  [ 1, '5' ]
                      Enter Factor
                         Enter Term
                            Called Lex --->  [ 2, '\n' ]
                         Exit Term
                      Exit Factor
                   Exit Factor
                Exit Expression
             Exit Action
          Exit Statement
          Called Lex --->  [ 2, '\n' ]
          Enter Program
             Enter Statement
             Exit Statement
             Called Lex --->  [ 0, 'print' ]
             Enter Program
                Enter Statement
                   Called Lex --->  [ 0, 'y' ]
                   Enter Action
                      Called Lex --->  [ 2, '\n' ]
                   Exit Action
                Exit Statement
                Called Lex --->  [ 14, '' ]
                Enter Program
                   Bye!
                Exit Program
             Exit Program
          Exit Program
       Exit Program
    Exit Program
```
## License

Copyright 2019 Ezzat Chamudi

Licensed under the Apache-2.0.