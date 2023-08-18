'use strict';

import Queue from '../src/index';

const testFn = (r) => {
  return r;
};

const testSyncFn = (r, d = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(r);
    }, d);
  });
};

describe('Queue', () => {
  it('Pass an object', () => {
    new Queue({
      waitList: [testFn.bind(null, 'A'), testSyncFn.bind(null, 'B'), testFn.bind(null, 'C')],
      maxConcurrency: 2
    });
  });

  it('Handle undefined queue', () => {
    new Queue({
      waitList: [testFn.bind(null, 'A'), undefined, testFn.bind(null, 'C')],
      maxConcurrency: 2
    });
  });

  it('Handle undefined results', () => {
    new Queue({
      waitList: [testFn.bind(null, 'A'), testFn.bind(null, undefined), testFn.bind(null, 'C')],
      maxConcurrency: 2
    });
  });

  it('Pass the waiting array directly', () => {
    new Queue([testFn.bind(null, 'A'), testSyncFn.bind(null, 'B'), testFn.bind(null, 'C')]);
  });

  it('Start execution queue', () => {
    const queue = new Queue([
      testFn.bind(null, 'A'),
      testSyncFn.bind(null, 'B'),
      testFn.bind(null, 'C')
    ]);
    queue.start();
  });

  it('Start executing the queue until the end', () => {
    const queue = new Queue([
      testFn.bind(null, 'A'),
      testSyncFn.bind(null, 'B'),
      testFn.bind(null, 'C')
    ]);
    queue.start();
    queue.on('finish', (results) => {
      expect(results).toEqual(['A', 'B', 'C']);
    });
  });

  it('Stop execution queue', () => {
    const queue = new Queue([
      testFn.bind(null, 'A'),
      testSyncFn.bind(null, 'B'),
      testFn.bind(null, 'C')
    ]);
    queue.start();

    queue.on('running', (e) => {
      if (e === 'A') {
        queue.stop();
      }
    });
  });

  it('Stop execution and finish the queue', () => {
    const queue = new Queue([
      testFn.bind(null, 'A'),
      testSyncFn.bind(null, 'B'),
      testFn.bind(null, 'C')
    ]);
    queue.start();
    queue.on('running', (result) => {
      if (result === 'A') {
        queue.stop(true);
      }
    });
    queue.on('finish', (results) => {
      // 测试代码
      console.log('Debugging message:', results);
      // 断言
      expect(results).toBe(['A', 'B', 'C']);
    });
  });

  it('Suspension and continuation of queues', () => {
    const queue = new Queue([
      testFn.bind(null, 'A'),
      testSyncFn.bind(null, 'B'),
      testFn.bind(null, 'C')
    ]);
    queue.pause();
    queue.resume();
  });
});
