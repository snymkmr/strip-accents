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
    'ſ': 's'
};

const stripAccents = (string) => {
    string = String(string);

    // Replace special characters and ligatures
    string = string.replace(/[ŒœÆæßÐðÞþĲĳĸŉſ]/g, (char) => replacements[char] || char);

    // Normalize and strip diacritics
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

module.exports = stripAccents;