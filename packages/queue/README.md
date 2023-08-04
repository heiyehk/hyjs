# `@hyjs/queue`

Sure! Here's a brief English description for your JavaScript library "@hyjs/queue":

"@hyjs/queue" is a powerful JavaScript library designed to manage function queues effectively. This library operates as a class, allowing users to control the maximum concurrency of queues and enabling error retries. With comprehensive event listeners, developers can monitor and respond to various stages of the queue, such as 'success', 'start', 'stop', 'pause', 'resume', 'running', 'finish', and 'error'. It provides a flexible and efficient solution for handling complex asynchronous tasks and optimizing performance in JavaScript applications.

## Usage

``` ts
import Queue from '@hyjs/queue';

const queue = new Queue({
  waitList: [fn, asyncFn, ...],
  // default 6
  maxConcurrency: 10,
  // default 0
  // does not work when the default is 0
  // If the default is greater than 0, and this function returns Error after execution,
  // it will retry the given number of retries until the execution is complete before continuing to execute waitList
  retryCount: 3
});

// or cdn

// <script src="https://unpkg.com/@hyjs/queue"></script>
// const queue = new __Queue__(opts);

// start working
queue.start();
```

## Event

``` ts

// event
// eventName: 'success' | 'start' | 'stop' | 'pause' | 'resume' | 'running' | 'finish' | 'error'
// success: (fnResult, index) => {}
// error: (fnErrorResult, index) => {}
// finish: (resultList) => {}
// other: () => {}
queue.on(eventName, () => {
  // do something
});
```

## API
``` ts
// start working
queue.start();


// add
queue.add(() => {});
queue.add(() => new Promise());
queue.add(async () => {});

// pause
queue.pause();

// resume
queue.resume();

// stop
queue.stop(boolean);
// boolean: true => event finish waitList and clear waitList
// boolean: false => stop immediately and clear waitList

// clear
queue.clear(); // clear waitList

// remove
queue.remove(fn); // remove fn from waitList
```