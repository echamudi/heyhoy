/**
 * RUUUN
 */
function heyhoy(code, debug = false) {
        const CHAR_NUMBER = 0;
        const CHAR_LETTER = 1;
        const CHAR_NEW_LINE = 2;
        const CHAR_SPACE = 3;
        const CHAR_EQ_SIGN = 4;
        const CHAR_ADD_SIGN = 5;
        const CHAR_MUL_SIGN = 6;

        const TOK_IDENTIFIER = 0;
        const TOK_NUMBER = 1;
        const TOK_NEW_LINE = 2;
        const TOK_EQ_SIGN = 11;
        const TOK_MUL_SIGN = 12;
        const TOK_ADD_SIGN = 13;
        const TOK_EOF = 14;

        var lexemes = [];
        var i = 0;

        function charCat(char) {
                if (char.length !== 1) throw new Error('Wrong length, must be one character -> ' + char);

                const charCode = char.charCodeAt(0);

                if (48 <= charCode && charCode <= 57) return CHAR_NUMBER;
                if (97 <= charCode && charCode <= 122) return CHAR_LETTER;
                if (charCode === 10) return CHAR_NEW_LINE;
                if (charCode === 32) return CHAR_SPACE;
                if (charCode === 61) return CHAR_EQ_SIGN;
                if (charCode === 43) return CHAR_ADD_SIGN;
                if (charCode === 42) return CHAR_MUL_SIGN;

                throw new Error('Wrong character -> ' + char);
        }

        function tokenizer(text) {
                next:
                while (true) {
                        if (text[i] === undefined) {
                                lexemes.push([TOK_EOF, '']);
                                return
                        };

                        switch (charCat(text[i])) {
                                case CHAR_NEW_LINE:
                                        lexemes.push([TOK_NEW_LINE, text[i]]);
                                        i++;
                                        continue next;
                                case CHAR_ADD_SIGN:
                                        lexemes.push([TOK_ADD_SIGN, text[i]]);
                                        i++;
                                        continue next;
                                case CHAR_MUL_SIGN:
                                        lexemes.push([TOK_MUL_SIGN, text[i]]);
                                        i++;
                                        continue next;
                                case CHAR_EQ_SIGN:
                                        lexemes.push([TOK_EQ_SIGN, text[i]]);
                                        i++;
                                        continue next;
                                case CHAR_SPACE:
                                        i++;
                                        continue next;
                                case CHAR_LETTER:
                                        let identifierString = "";

                                        while (charCat(text[i]) === CHAR_LETTER || charCat(text[i]) === CHAR_NUMBER) {
                                                identifierString += text[i];
                                                i++;
                                        }

                                        lexemes.push([TOK_IDENTIFIER, identifierString]);
                                        continue next;
                                case CHAR_NUMBER:
                                        let numberString = "";

                                        while (charCat(text[i]) === CHAR_NUMBER) {
                                                numberString += text[i];
                                                i++;
                                        }

                                        lexemes.push([TOK_NUMBER, numberString]);
                                        continue next;
                                default:
                                        throw new Error('Tokenizer says: Wrong Char! -> ' + text[i]);
                        }
                }
        }

        tokenizer(code);
        console.log(lexemes);

        var currentTok = lexemes[0][0];
        var currentLex = lexemes[0][1];
        var currentLexIndex = 0;
        console.log('Initial Lex ---> ', lexemes[currentLexIndex]);

        function lex() {
                currentLexIndex++;
                currentTok = lexemes[currentLexIndex][0];
                currentLex = lexemes[currentLexIndex][1];
                console.log('Called Lex ---> ', lexemes[currentLexIndex]);
        }

        function program() {
                console.log('Enter Program');

                if (currentTok === TOK_EOF) {
                        console.log('Bye!');
                        return;
                } else {
                        statement();
                        lex();
                        program();
                }

                console.log('Exit Program');
        }

        function statement() {
                console.log('Enter Statement');

                if (currentTok === TOK_IDENTIFIER) {
                        lex();
                        action();

                        if (currentTok === TOK_NEW_LINE) {
                                //  Completed
                        } else {
                                throw new Error('Statement: expecting new line');
                        }
                } else if (currentTok === TOK_NEW_LINE) {
                        // Completed
                } else {
                        throw new Error('Statement: first token is wrong');
                }

                console.log('Exit Statement');
        }

        function action() {
                console.log('Enter Action');

                if (currentTok === TOK_EQ_SIGN) {
                        // Assignment
                        lex();
                        expression();
                } else if (currentTok === TOK_IDENTIFIER) {
                        // Function call
                        lex();
                } else {
                        throw new Error('Action: first token is wrong');
                }

                console.log('Exit Action');
        }

        function expression() {
                console.log('Enter Expression');

                factor();

                if (currentTok === TOK_ADD_SIGN) {
                        lex();
                        expression();
                }

                console.log('Exit Expression');
        }

        function factor() {
                console.log('Enter Factor');

                term();

                if (currentTok === TOK_MUL_SIGN) {
                        lex();
                        factor();
                }

                console.log('Exit Factor');
        }

        function term() {
                console.log('Enter Term');

                if (currentTok === TOK_NUMBER) {
                        // Handle Number
                } else if (currentTok === TOK_IDENTIFIER) {
                        // Handle variable
                } else {
                        throw new Error('Term: first token is wrong');
                }

                lex();

                console.log('Exit Term');
        }

}
module.exports = heyhoy;