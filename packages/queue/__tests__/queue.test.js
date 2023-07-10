'use strict';

const queue = require('..');
const assert = require('assert').strict;

assert.strictEqual(queue(), 'Hello from queue');
console.info('queue tests passed');
