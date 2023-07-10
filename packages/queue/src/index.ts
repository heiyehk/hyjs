// import type { QueueEvent, QueueOptions, QueueParams, SignWaitRecord, WaitFn } from './type';
// import { getAccessType, isNullOrUndefined } from './utils';
type WaitFn = (...args: any[]) => void;
type WaitFunction = WaitFn | Promise<WaitFn>;
type SignWaitRecord = { _id: number; fn: WaitFunction };

type AccessType =
  | 'String'
  | 'Object'
  | 'Number'
  | 'Boolean'
  | 'Symbol'
  | 'Undefined'
  | 'Null'
  | 'Function'
  | 'AsyncFunction'
  | 'Date'
  | 'Array'
  | 'RegExp'
  | 'Error'
  | 'Promise'
  | 'global';

/**
 * 类型获取
 * @param access 参数
 */
const getAccessType = (access: any): AccessType => {
  return Object.prototype.toString.call(access).slice(8, -1) as AccessType;
};

const isNullOrUndefined = (access: any): boolean => access === null || access === undefined;
const isError = (access: any): boolean => getAccessType(access) === 'Error';
/**
 * 队列
 * @param waitList 等待队列
 * @param maxConcurrency 最大并发数
 * @param maxQueue 最大队列数
 * @param timeout 超时时间
 * @param retry 重试次数
 * @param retryDelay 重试延迟
 * @param retryBackoff 重试退避
 * @param retryJitter 重试抖动
 * @param retryMaxDelay 重试最大延迟
 * @param retryMaxAttempts 重试最大次数
 * @param retryHandle 重试条件
 * @param retryFilter 重试过滤
 * @param retryTimeout 重试超时
 * @param retryOnTimeout 重试超时处理
 * @returns
 * @example
 * ``` ts
 * const queue = new Queue({
 *   waitList: [fn1, fn2, fn3],
 *   maxConcurrency: 1,
 *   maxQueue: 1,
 *   timeout: 1000,
 *   retry: 3,
 *   retryDelay: 1000,
 *   retryBackoff: 1,
 *   retryJitter: 1,
 *   retryMaxDelay: 1000,
 *   retryMaxAttempts: 3,
 *   retryHandle: (error, retryCount) => true,
 *   retryFilter: (error, retryCount) => true,
 *   retryTimeout: 1000,
 *   retryOnTimeout: true,
 * });
 * ```
 */
type QueueOptions = {
  /** 等待队列 */
  waitList: WaitFunction[];
  /** 最大并发数 */
  maxConcurrency: number;
  /** 最大队列数 */
  maxQueue: number;
  /** 超时时间 */
  timeout: number;
  /** 超时处理 */
  retry: number;
  /** 重试延迟 */
  retryDelay: number;
  /** 重试退避 */
  retryBackoff: number;
  /** 重试抖动 */
  retryJitter: number;
  /** 重试最大延迟 */
  retryMaxDelay: number;
  /** 重试最大次数 */
  retryMaxAttempts: number;
  /** 重试条件 */
  retryHandle: (error: Error, retryCount: number) => boolean;
  /** 重试过滤 */
  retryFilter: (error: Error, retryCount: number) => boolean;
  /** 重试超时 */
  retryTimeout: number;
  /** 重试超时处理 */
  retryOnTimeout: boolean;
};
type QueueParams = Partial<QueueOptions> | WaitFunction[];

type QueueEvent =
  | 'success'
  | 'start'
  | 'stop'
  | 'pause'
  | 'resume'
  | 'running'
  | 'add'
  | 'remove'
  | 'finish'
  | 'clear'
  | 'error'
  | 'timeout'
  | 'retry'
  | 'retryError'
  | 'retryTimeout'
  | 'retryMaxAttempts'
  | 'retryMaxDelay'
  | 'retryBackoff'
  | 'retryJitter'
  | 'retryDelay'
  | 'retryFilter'
  | 'retryHandle'
  | 'retryOnTimeout';
class Queue {
  public status: QueueEvent = 'stop';
  private cacheList: SignWaitRecord[] = [];
  private waitList: SignWaitRecord[] = [];
  private runningList: SignWaitRecord[] = [];
  private resultList: any[] = [];
  private runningIndex = 0;

  private maxConcurrency = 6;
  private maxQueue = 1;
  private timeout = 1000;
  private retry = 3;
  private retryDelay = 1000;
  private retryBackoff = 1;
  private retryJitter = 1;
  private retryMaxDelay = 1000;
  private retryMaxAttempts = 3;
  private retryHandle = (error: Error, retryCount: number) => true;
  private retryFilter = (error: Error, retryCount: number) => true;
  private retryTimeout = 1000;
  private retryOnTimeout = true;
  private events: Record<QueueEvent, ((...args: any[]) => void)[]> = {} as any;

  private allowStart = ['stop', 'pause', 'resume', 'error', 'timeout'];
  private notAllowStart = ['start', 'running'];
  private allowStop = ['start', 'running', 'pause', 'resume', 'error', 'timeout'];
  private allowPause = ['running', 'error', 'timeout'];
  private allowResume = ['pause', 'error', 'timeout'];

  constructor(params: QueueParams, options?: Partial<Omit<QueueOptions, 'waitList'>>) {
    if (getAccessType(params) === 'Object') {
      this.init(params as QueueOptions);
    } else {
      this.init({ waitList: params, ...options } as QueueOptions);
    }
  }

  private init(params: QueueOptions) {
    const waitList = [...(params.waitList || this.cacheList)].map((item, index) => ({
      _id: index,
      fn: item
    }));

    this.cacheList = [...waitList];
    this.waitList = waitList;
    this.maxConcurrency = params.maxConcurrency || this.maxConcurrency;
    this.maxQueue = params.maxQueue || this.maxQueue;
    this.timeout = params.timeout || this.timeout;
    this.retry = params.retry || this.retry;
    this.retryDelay = params.retryDelay || this.retryDelay;
    this.retryBackoff = params.retryBackoff || this.retryBackoff;
    this.retryJitter = params.retryJitter || this.retryJitter;
    this.retryMaxDelay = params.retryMaxDelay || this.retryMaxDelay;
    this.retryMaxAttempts = params.retryMaxAttempts || this.retryMaxAttempts;
    this.retryHandle = params.retryHandle || this.retryHandle;
    this.retryFilter = params.retryFilter || this.retryFilter;
    this.retryTimeout = params.retryTimeout || this.retryTimeout;
    this.retryOnTimeout = params.retryOnTimeout || this.retryOnTimeout;

    this.runningList = this.waitList.splice(0, this.maxConcurrency);
  }

  on(event: QueueEvent, listener: (...args: any[]) => void) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(listener);
  }

  start() {
    if (this.notAllowStart.includes(this.status)) {
      throw new Error(`当前状态为${this.status}，不允许执行start`);
    }

    this.status = 'start';
    this.runOnEvent('start');
    this.run();
  }

  stop() {
    console.log('stop');
  }

  pause() {
    console.log('pause');
  }

  resume() {
    console.log('resume');
  }

  add(fn: WaitFn | Promise<WaitFn>) {
    console.log(fn);
  }

  remove(fn: WaitFn | Promise<WaitFn>) {
    console.log(fn);
  }

  clear() {
    console.log('clear');
  }

  private async run() {
    if (this.allowStart.includes(this.status)) {
      return;
    }

    this.status = 'running';

    this.runOnEvent('running');
    await this.traverseRunningList();
  }

  private fnToPromiseFn(fn: WaitFn) {
    return new Promise((resolve, reject) => {
      try {
        const result = fn();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  private async operationalFn(record: SignWaitRecord) {
    let fnResult: any;

    if (getAccessType(record.fn) !== 'Function') {
      console.log(await record.fn, this.runningIndex);
      return new Error(
        `${record.fn.toString()} is not a function, the subscript is ${this.runningIndex}`
      );
    } else {
      fnResult = await this.fnToPromiseFn(record.fn as WaitFn).then((res: any) => {
        return res;
      });
      this.runOnEvent('success', fnResult);
    }

    // 当前任务执行完毕，将结果存入结果集
    this.resultList[record._id] = fnResult;
    this.runningList.splice(
      this.runningList.findIndex((item) => item._id === record._id),
      1
    );
    this.runningIndex++;

    if (this.waitList.length > 0 && this.runningIndex <= this.cacheList.length - 1) {
      const nextFn = this.waitList.shift() as SignWaitRecord;
      this.runningList.push(nextFn);
      this.operationalFn(nextFn);
    }

    if (this.waitList.length === 0 && this.runningList.length === 0) {
      this.status = 'finish';
      this.runningIndex = 0;
      this.runOnEvent('finish', this.resultList);
    }
  }

  private async traverseRunningList() {
    // 循环去遍历 runningList
    for (let i = 0; i < this.maxConcurrency; i++) {
      const record = this.runningList[i];

      // 如果是 undefined 抛出错误
      if (this.runningIndex < this.cacheList.length) {
        if (isNullOrUndefined(record.fn)) {
          console.log(await record.fn);
          this.runOnEvent(
            'error',
            new Error(`${record.fn.toString()} is undefined, the subscript is ${this.runningIndex}`)
          );
        }

        const error = this.operationalFn(record);

        if (error) throw error;
      }
    }
  }

  runOnEvent(event: QueueEvent, ...args: any[]) {
    if (this.events[event] && this.events[event].length) {
      for (let i = 0; i < this.events[event].length; i++) {
        this.events[event][i](...args);
      }
    }
  }
}

export default Queue;
const a = [];
const aaa = (b: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(b);
    }, 1000);
  });
};
a.push(aaa('aaaaaaaaa'));
// a.push(aaa.bind(null, 'aaaaaaaaa'));

const jsAsyncTemp = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('{{code}}');
    }, 1000);
  });
};
const jsSyncTemp = () => {
  return '{{code}}';
};
for (let i = 0; i < 10; i++) {
  const sc = String.fromCharCode(65 + i);

  let s = jsSyncTemp.toString().replace('{{code}}', sc);
  if (i % 2 === 0) {
    s = jsAsyncTemp.toString().replace('{{code}}', sc);
  }
  a.push(eval(`(${s})`));
}

const queue = new Queue(a, {
  maxConcurrency: 1
});

let start_time = 0;
let end_time = 0;
queue.on('start', () => {
  start_time = performance.now();
});
queue.on('finish', (e) => {
  console.log('finish===', e);
  end_time = performance.now();
  console.log('耗时：' + (end_time - start_time) + '微秒。');
});

queue.start();
