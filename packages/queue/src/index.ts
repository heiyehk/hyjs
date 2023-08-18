import type { QueueEvent, QueueOptions, QueueParams, SignWaitRecord, WaitFn } from './type';
import { getAccessType, isError, isNullOrUndefined } from './utils';

/**
 * Queue
 * @param waitList witeList
 * @param maxConcurrency max concurrency, default 6
 * @param retryCount error retry count, default 0
 *
 * @example
 * ``` ts
 * const queue = new Queue({
 *   waitList: [fn1, fn2, fn3],
 *   maxConcurrency: 1,
 *   retryCount: 3
 * });
 * ```
 */
class Queue {
  private waitList: SignWaitRecord[] = [];
  private maxConcurrency = 6;
  private retryCount = 0;

  public status: QueueEvent = 'stop';

  private cacheList: SignWaitRecord[] = [];
  private runningList: SignWaitRecord[] = [];
  private resultList: any[] = [];
  private runningIndex = 0;

  private events: Record<QueueEvent, ((...args: any[]) => void)[]> = {} as any;

  private allowStart = ['stop', 'pause', 'error'];
  private notAllowStart = ['start', 'running'];

  constructor(params: QueueParams, options?: Partial<Omit<QueueOptions, 'waitList'>>) {
    if (getAccessType(params) === 'Object') {
      this.init(params as QueueOptions);
    } else {
      this.init({ waitList: params, ...options } as QueueOptions);
    }
  }

  private fillAttribute(list: any[]) {
    return list.map((item, index) => {
      return {
        fn: item,
        _id: index
      };
    }) as SignWaitRecord[];
  }

  private init(params: QueueOptions) {
    const waitList = this.fillAttribute([...(params.waitList || this.cacheList)]);

    this.cacheList = [...waitList];
    this.waitList = [...waitList];
    this.maxConcurrency = params.maxConcurrency || this.maxConcurrency;
    this.runningList = this.waitList.splice(0, this.maxConcurrency);
    this.retryCount = params.retryCount || this.retryCount;
  }

  /**
   * listener event
   * Will be called when the event is triggered, and the event will be passed into the parameter list of the listener
   * @param event event name `success` | `start` | `stop` | `pause` | `resume` | `running` | `finish` | `error`
   * @param listener
   */
  on(event: QueueEvent, listener: (...args: any[]) => void) {
    if (!this.events[event]) {
      this.events[event] = [listener];
    } else {
      this.events[event].push(listener);
    }
  }

  /**
   * start execution queue
   */
  start() {
    if (this.notAllowStart.includes(this.status)) {
      throw new Error(`The current status is ${this.status}, start is not allowed`);
    }

    this.status = 'start';
    this.runOnEvent(this.status);
    this.run();
  }

  /**
   * stop queue
   * @param finish Whether to execute the finish event
   * @default false
   */
  async stop(finish = false) {
    this.status = 'stop';
    this.runOnEvent(this.status);
    if (finish) {
      this.finishEvent();
    }
  }

  /**
   * pause queue
   */
  pause() {
    this.status = 'pause';
    this.runOnEvent(this.status);
  }

  /**
   * resume queue
   */
  resume() {
    this.status = 'resume';
    this.runOnEvent(this.status);
    this.traverseRunningList();
  }

  add(fn: WaitFn | Promise<WaitFn>): void;
  add(fn: WaitFn | Promise<WaitFn>, index?: number): void;
  add(fn: WaitFn | Promise<WaitFn>, index?: number) {
    if (index !== undefined) {
      this.waitList.splice(index, 0, {
        _id: index,
        fn
      });
      return;
    }

    const _id = this.cacheList.length;
    const record = {
      _id,
      fn
    };

    this.cacheList.push(record);
    this.waitList.push(record);
  }

  /**
   * Delete a task from the queue
   * @param fn If it is a function,
   * it will judge whether it is the same function according to the toString method of the function,
   * otherwise,
   * the last task in the waitList will be automatically deleted
   * @returns
   */
  remove(fn?: WaitFn | Promise<WaitFn>) {
    if (fn) {
      this.waitList = this.waitList.filter((item) => item.fn.toString() !== fn.toString());
    } else {
      // 删除最后一个
      if (this.runningList.length) {
        // 如果还有正在等待的任务，删除最后一个
        if (this.waitList.length) {
          this.waitList.pop();
        }
        this.runningList.pop();
        this.cacheList.pop();
      }
    }
  }

  clear() {
    this.waitList = [];
    this.runningList = [];
    this.cacheList = [];
    this.resultList = [];
    this.runningIndex = 0;
  }

  private run() {
    if (this.allowStart.includes(this.status)) {
      return;
    }
    this.status = 'running';

    this.traverseRunningList();
  }

  private async operationalFn(record: SignWaitRecord) {
    if (this.allowStart.includes(this.status)) {
      return;
    }

    if (typeof record.fn !== 'function') {
      return new Error(`${record.fn} is not a function, the subscript is ${this.runningIndex}`);
    }

    const fnResult = await record.fn();

    this.runOnEvent('running', record._id);

    // error retry
    if (
      isError(fnResult) &&
      this.retryCount &&
      (!record._retryCount || record._retryCount < this.retryCount)
    ) {
      this.runOnEvent('error', fnResult, record._id);
      record._retryCount = record._retryCount ? record._retryCount + 1 : 1;
      this.operationalFn(record);
    } else {
      if (!record._remove) {
        this.runOnEvent('success', fnResult, record._id);
      }

      // After the current task is executed, the result will be stored in the result set.
      // Even if the task is deleted, it must be saved. Enter the result set
      this.resultList[record._id] = fnResult;

      this.runningIndex++;

      // After the current task is executed, delete it from the runningList
      this.runningList.splice(
        this.runningList.findIndex((item) => item._id === record._id),
        1
      );

      if (record._remove) {
        return;
      }

      if (this.waitList.length > 0) {
        const nextFn = this.waitList.shift() as SignWaitRecord;
        this.runningList.push(nextFn);
        this.operationalFn(nextFn);
      }

      if (this.runningIndex === this.cacheList.length) {
        this.finishEvent();
      }
    }
  }

  private traverseRunningList() {
    for (let i = 0; i < this.maxConcurrency; i++) {
      if (this.allowStart.includes(this.status)) {
        break;
      }

      const record = this.runningList[i];

      if (!record) {
        break;
      }

      // If it is undefined throw an error
      if (this.runningIndex < this.cacheList.length) {
        if (isNullOrUndefined(record.fn)) {
          const error = new Error(
            `${record.fn} is undefined, the subscript is ${this.runningIndex}`
          );
          this.runOnEvent('error', error, record._id);
          throw error;
        }

        this.operationalFn(record);
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

  finishEvent() {
    this.status = 'finish';
    this.runningIndex = 0;
    this.waitList = [];
    this.cacheList = [];
    this.runOnEvent('finish', this.resultList);
  }
}

export default Queue;
