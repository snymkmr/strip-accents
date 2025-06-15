const assert = require('assert');
const stripAccents = require('../');

assert.strictEqual(stripAccents('Sañyam'), 'Sanyam');
assert.strictEqual(stripAccents('Œuvre'), 'OEuvre');

console.log('All tests passed.');
