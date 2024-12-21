const unidecode = require('unidecode');

const controlCharStart = `\u{0000}`;    // <control> UTF-8
const controlCharEnd = `\u{001F}`;

const latin1SupplementStart = `\u{0080}`;    // Latin-1 supplement
const latin1SupplementEnd = `\u{00BF}`;

const mathOperatorsStart = `\u{2200}`;    // Mathematical operators
const mathOperatorsEnd = `\u{259F}`;

const stripPattern = new RegExp(`[${`\u{0152}`}${`\u{0153}`}${`\u{00D0}`}${`\u{00E6}`}${`\u{0131}`}${`\u{00C6}`}${`\u{00F8}`}${`\u{00D7}`}${`\u{00D8}`}${`\u{25A0}`}${`\u{0192}`}${`\u{00DF}`}${`\u{00FE}`}${`\u{00DE}`}${`\u{2017}`}${`\u{00F0}`}${`\u{00F7}`}${controlCharStart}-${controlCharEnd}${latin1SupplementStart}-${latin1SupplementEnd}${mathOperatorsStart}-${mathOperatorsEnd}]`, `g`);

const stripAccents = (string) => {
    string = String(string);
    string = string.replace(stripPattern, ` `);

    // Stripping outlier characters
    return unidecode(string);
};

module.exports = stripAccents;
// console.log(stripAccents("Sañyam"));