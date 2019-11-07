/**
 * Hey Hoy Parser
 * @param {string} code the heyhoy code
 * @param {boolean} verbose turn on to see all verbose log
 */
function heyhoy(code, verbose = false)
{
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

        /** @type {[number, string][]} */
        const lexemes = [];

        // Logger
        const Log = {
                /**
                 * @param {any[]} params log anything
                 */
                v: (...params) =>
                {
                        if (verbose)
                        {
                                console.log(...params);
                        }
                },
        };

        Log.v('Start Hey Hoy!');
        Log.v('Inputted code:');
        Log.v(code);

        /**
         * Get character categorization
         * @param {string} char string with one character length
         */
        function charCat(char)
        {
                if (char.length !== 1) throw new Error(`Wrong length, must be one character -> ${char}`);

                const charCode = char.charCodeAt(0);

                if (charCode >= 48 && charCode <= 57) return CHAR_NUMBER;
                if (charCode >= 97 && charCode <= 122) return CHAR_LETTER;
                if (charCode === 10) return CHAR_NEW_LINE;
                if (charCode === 32) return CHAR_SPACE;
                if (charCode === 61) return CHAR_EQ_SIGN;
                if (charCode === 43) return CHAR_ADD_SIGN;
                if (charCode === 42) return CHAR_MUL_SIGN;

                throw new Error(`Wrong character -> ${char}`);
        }

        /**
         * Get lexemes and tokens of the code
         * @param {string} text the code
         * @returns {void}
         */
        function tokenizer(text)
        {
                let i = 0;

                while (text[i] !== undefined)
                {
                        let tmp_string = '';

                        switch (charCat(text[i]))
                        {
                        case CHAR_NEW_LINE:
                                lexemes.push([TOK_NEW_LINE, text[i]]);
                                i += 1;
                                break;
                        case CHAR_ADD_SIGN:
                                lexemes.push([TOK_ADD_SIGN, text[i]]);
                                i += 1;
                                break;
                        case CHAR_MUL_SIGN:
                                lexemes.push([TOK_MUL_SIGN, text[i]]);
                                i += 1;
                                break;
                        case CHAR_EQ_SIGN:
                                lexemes.push([TOK_EQ_SIGN, text[i]]);
                                i += 1;
                                break;
                        case CHAR_SPACE:
                                i += 1;
                                break;
                        case CHAR_LETTER:
                                tmp_string = '';

                                while (charCat(text[i]) === CHAR_LETTER
                                || charCat(text[i]) === CHAR_NUMBER)
                                {
                                        tmp_string += text[i];
                                        i += 1;
                                }

                                lexemes.push([TOK_IDENTIFIER, tmp_string]);
                                break;
                        case CHAR_NUMBER:
                                tmp_string = '';

                                while (charCat(text[i]) === CHAR_NUMBER)
                                {
                                        tmp_string += text[i];
                                        i += 1;
                                }

                                lexemes.push([TOK_NUMBER, tmp_string]);
                                break;
                        default:
                                throw new Error(`Tokenizer says: Wrong Char! -> ${text[i]}`);
                        }
                }

                lexemes.push([TOK_EOF, '']);
        }

        tokenizer(code);

        Log.v('Tokens & Lexemes');
        Log.v(lexemes);

        let current_tok = lexemes[0][0];
        // eslint-disable-next-line no-unused-vars
        let current_lex = lexemes[0][1];
        let current_lex_i = 0;

        let recursive_depth = 0;

        function lex()
        {
                current_lex_i += 1;
                [current_tok, current_lex] = lexemes[current_lex_i];
                Log.v('   '.repeat(recursive_depth), 'Called Lex ---> ', lexemes[current_lex_i]);
        }

        Log.v('Tokens & Lexemes');
        Log.v('Initial Lex ---> ', lexemes[current_lex_i]);

        function program()
        {
                Log.v('   '.repeat(recursive_depth), 'Enter Program');
                recursive_depth += 1;

                if (current_tok === TOK_EOF)
                {
                        Log.v('   '.repeat(recursive_depth), 'Bye!');
                        return;
                }
                statement();
                lex();
                program();

                recursive_depth -= 1;
                Log.v('   '.repeat(recursive_depth), 'Exit Program');
        }

        function statement()
        {
                Log.v('   '.repeat(recursive_depth), 'Enter Statement');
                recursive_depth += 1;

                if (current_tok === TOK_IDENTIFIER)
                {
                        lex();
                        action();

                        // @ts-ignore
                        if (current_tok === TOK_NEW_LINE)
                        {
                                //  Completed
                        }
                        else
                        {
                                throw new Error('Statement: expecting new line');
                        }
                }
                else if (current_tok === TOK_NEW_LINE)
                {
                        // Completed
                }
                else
                {
                        throw new Error('Statement: first token is wrong');
                }

                recursive_depth -= 1;
                Log.v('   '.repeat(recursive_depth), 'Exit Statement');
        }

        function action()
        {
                Log.v('   '.repeat(recursive_depth), 'Enter Action');
                recursive_depth += 1;

                if (current_tok === TOK_EQ_SIGN)
                {
                        // Assignment
                        lex();
                        expression();
                }
                else if (current_tok === TOK_IDENTIFIER)
                {
                        // Function call
                        lex();
                }
                else
                {
                        throw new Error('Action: first token is wrong');
                }

                recursive_depth -= 1;
                Log.v('   '.repeat(recursive_depth), 'Exit Action');
        }

        function expression()
        {
                Log.v('   '.repeat(recursive_depth), 'Enter Expression');
                recursive_depth += 1;

                factor();

                if (current_tok === TOK_ADD_SIGN)
                {
                        lex();
                        expression();
                }

                recursive_depth -= 1;
                Log.v('   '.repeat(recursive_depth), 'Exit Expression');
        }

        function factor()
        {
                Log.v('   '.repeat(recursive_depth), 'Enter Factor');
                recursive_depth += 1;

                term();

                if (current_tok === TOK_MUL_SIGN)
                {
                        lex();
                        factor();
                }

                recursive_depth -= 1;
                Log.v('   '.repeat(recursive_depth), 'Exit Factor');
        }

        function term()
        {
                Log.v('   '.repeat(recursive_depth), 'Enter Term');
                recursive_depth += 1;

                if (current_tok === TOK_NUMBER)
                {
                        // Handle Number
                }
                else if (current_tok === TOK_IDENTIFIER)
                {
                        // Handle variable
                }
                else
                {
                        throw new Error('Term: first token is wrong');
                }

                lex();

                recursive_depth -= 1;
                Log.v('   '.repeat(recursive_depth), 'Exit Term');
        }

        program();
}
module.exports = heyhoy;
