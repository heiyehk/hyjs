'use strict';

const recommended = require('..');
const assert = require('assert').strict;

assert.strictEqual(recommended(), 'Hello from recommended');
console.info('recommended tests passed');
