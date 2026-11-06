// Letters that have no Unicode decomposition into "base letter + accent",
// so normalization alone cannot strip them. Map them to ASCII explicitly.
const replacements = {
    'Œ': 'OE',
    'œ': 'oe',
    'Æ': 'AE',
    'æ': 'ae',
    'ß': 'ss',
    'Ð': 'D',
    'ð': 'd',
    'Þ': 'TH',
    'þ': 'th',
    'Ĳ': 'IJ',
    'ĳ': 'ij',
    'ĸ': 'k',
    'ŉ': 'n',
    'ſ': 's',
    'Ø': 'O',
    'ø': 'o',
    'Ł': 'L',
    'ł': 'l',
    'Đ': 'D',
    'đ': 'd',
    'ı': 'i',
    'Ħ': 'H',
    'ħ': 'h',
    'Ŧ': 'T',
    'ŧ': 't',
    'Ŋ': 'N',
    'ŋ': 'n',
    'Ŀ': 'L',
    'ŀ': 'l'
};

const specialCharacters = new RegExp(`[${Object.keys(replacements).join('')}]`, 'g');

// Non-spacing combining marks used as accents:
//   U+0300–036F  Combining Diacritical Marks
//   U+1AB0–1AFF  Combining Diacritical Marks Extended
//   U+1DC0–1DFF  Combining Diacritical Marks Supplement
//   U+20D0–20F0  Combining Diacritical Marks for Symbols, excluding the enclosing
//                marks U+20DD–20E0 and U+20E2–20E4 (keycap emoji such as 1️⃣ use U+20E3)
//   U+FE20–FE2F  Combining Half Marks
// Marks belonging to other scripts (e.g. Japanese dakuten U+3099, Devanagari vowel signs) are kept.
const combiningMarks = /[̀-ͯ᪰-᫿᷀-᷿⃐-⃥⃜⃡-⃰︠-︯]/g;

const stripAccents = (string) => {
    return String(string)
        .replace(specialCharacters, (char) => replacements[char])
        .normalize('NFD')
        .replace(combiningMarks, '')
        // Recompose what is left so text in other scripts (Korean, Japanese, …)
        // comes back as the same code points instead of decomposed sequences.
        .normalize('NFC');
};

module.exports = stripAccents;
