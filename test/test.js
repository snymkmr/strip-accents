const assert = require('assert');
const stripAccents = require('../');

assert.strictEqual(stripAccents('Sañyam'), 'Sanyam');
assert.strictEqual(stripAccents('Œuvre'), 'OEuvre');
assert.strictEqual(stripAccents('æther'), 'aether');
assert.strictEqual(stripAccents('Straße'), 'Strasse');
assert.strictEqual(stripAccents('Crème Brûlée'), 'Creme Brulee');

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

console.log('All tests passed.');
