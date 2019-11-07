/* eslint-disable prefer-arrow-callback */

const heyhoy = require('../');

/** @type {boolean} */
let verbose;

if (process.argv[3] === '--verbose')
{
        verbose = true;
}
else
{
        verbose = false;
}

const codes = [
        `
x = 5
y = x * 5

print y
        `,

        '',

        `


        `,

        `
x1 = 20
y1 = 30
x2 = 30
y2 = 40

res = x1 * x2 + y1 * y2

print res
        `,
];

describe('Work properly', function ()
{
        codes.forEach((code, index) =>
        {
                it(`passes test ${index}`, function ()
                {
                        heyhoy(code, verbose);
                });
        });
});
