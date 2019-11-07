# HEYHOY!

(WIP - Experimental) Damn simple programming language built using javascript from scratch (no jison, no bison).

> This project is created to me help studying recursive-descent top-down parser implementation.

# Language Grammar

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

# License

Copyright 2019 Ezzat Chamudi

Licensed under the Apache-2.0.