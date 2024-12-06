let unidecode = require('unidecode')

const stripAccents = (string) => {

    start0 = `\u{0000}`;    // <control> UTF-8
    end0 = `\u{001F}`;

    start1 = `\u{0080}`;    // Latin-1 supliment
    end1 = `\u{00BF}`;

    start2 = `\u{2200}`     // Mathematical operators
    end2 = `\u{259F}`;

    stripPattern = new RegExp(`[${`\u{0152}`}${`\u{0153}`}${`\u{00D0}`}${`\u{00E6}`}${`\u{0131}`}${`\u{00C6}`}${`\u{00F8}`}${`\u{00D7}`}${`\u{00D8}`}${`\u{25A0}`}${`\u{0192}`}${`\u{00DF}`}${`\u{00FE}`}${`\u{00DE}`}${`\u{2017}`}${`\u{00F0}`}${`\u{00F7}`}${start0}-${end0}${start1}-${end1}${start2}-${end2}]`, `g`);
    string = "" + string;
    string = string.replace(stripPattern, ` `);

    // stripping outlier characters
    return unidecode(string);
}

module.exports = stripAccents
// console.log(stripAccents("Sañyam"));
