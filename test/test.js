const assert = require('assert');
const stripAccents = require('../');

assert.strictEqual(stripAccents('Sañyam'), 'Sanyam');
assert.strictEqual(stripAccents('Œuvre'), 'OEuvre');
assert.strictEqual(stripAccents('æther'), 'aether');
assert.strictEqual(stripAccents('Straße'), 'Strasse');
assert.strictEqual(stripAccents('Crème Brûlée'), 'Creme Brulee');

// Combining-mark sequences should normalize before stripping
assert.strictEqual(stripAccents('Cafe\u0301'), 'Cafe');
assert.strictEqual(stripAccents('A\u030Angstrom'), 'Angstrom');

// Non-string inputs are coerced via String()
assert.strictEqual(stripAccents(42), '42');
assert.strictEqual(stripAccents(null), 'null');

// Legacy coverage tests
// Control characters (0x00-0x1F) - Should be preserved or stripped depending on normalize? 
// Current implementation preserves them as they are not diacritics.
assert.strictEqual(stripAccents('\u0000\u001F'), '\u0000\u001F');

// Latin-1 Supplement (0x80-0xBF) - e.g., ©, ®, ±
// Current implementation preserves these as they are not combining diacritics.
assert.strictEqual(stripAccents('©'), '©');
assert.strictEqual(stripAccents('®'), '®');

// Math Operators (0x2200-0x259F)
// Current implementation preserves most, normalizes some.
assert.strictEqual(stripAccents('∀'), '∀');
assert.strictEqual(stripAccents('∑'), '∑');

// Letters without a Unicode decomposition are mapped to ASCII
assert.strictEqual(stripAccents('Søren Ørsted'), 'Soren Orsted');
assert.strictEqual(stripAccents('Łódź, Wałęsa'), 'Lodz, Walesa');
assert.strictEqual(stripAccents('Đorđe, Đà Nẵng'), 'Dorde, Da Nang');
assert.strictEqual(stripAccents('Kırıkkale'), 'Kirikkale');
assert.strictEqual(stripAccents('Ħamrun ħ'), 'Hamrun h');
assert.strictEqual(stripAccents('Ŧŧ Ŋŋ Ŀŀ'), 'Tt Nn Ll');

// Accents from the extended combining-mark blocks are stripped too
assert.strictEqual(stripAccents('e᷄'), 'e');      // Supplement
assert.strictEqual(stripAccents('a᪰'), 'a');      // Extended
assert.strictEqual(stripAccents('v⃗'), 'v');      // For Symbols
assert.strictEqual(stripAccents('t︠s︡'), 'ts'); // Half Marks
assert.strictEqual(stripAccents('Tiếng Việt'), 'Tieng Viet');

// Text in other scripts comes back unchanged (same code points, not decomposed)
assert.strictEqual(stripAccents('한국어'), '한국어');
assert.strictEqual(stripAccents('がぎぐ'), 'がぎぐ');
assert.strictEqual(stripAccents('हिन्दी'), 'हिन्दी');
assert.strictEqual(stripAccents('Ελλάδα'), 'Ελλαδα');  // Greek accents are stripped

// Emoji survive, including keycaps that use an enclosing combining mark (U+20E3)
assert.strictEqual(stripAccents('café ☕️👍🏽'), 'cafe ☕️👍🏽');
assert.strictEqual(stripAccents('1️⃣ #️⃣'), '1️⃣ #️⃣');

assert.strictEqual(stripAccents(''), '');
assert.strictEqual(stripAccents(undefined), 'undefined');

console.log('All tests passed.');
