'use strict';

const mirrorSandbox = require('..');
const assert = require('assert').strict;

assert.strictEqual(mirrorSandbox(), 'Hello from mirrorSandbox');
console.info('mirrorSandbox tests passed');
