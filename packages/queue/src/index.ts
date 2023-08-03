import type { QueueEvent, QueueOptions, QueueParams, SignWaitRecord, WaitFn } from './type';
import { getAccessType, isError, isNullOrUndefined } from './utils';

/**
 * 队列
 * @param waitList 等待队列
 * @param maxConcurrency 最大并发数
 * @param retryCount 错误重试次数
 * @returns
 * @example
 * ``` ts
 * const queue = new Queue({
 *   waitList: [fn1, fn2, fn3],
 *   maxConcurrency: 1,
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

  private allowStart = ['stop', 'pause', 'error', 'timeout'];
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

  /**
   * 停止队列
   * @param finish 是否执行finish事件
   */
  stop(finish = false) {
    this.status = 'stop';
    if (finish) {
      this.finishEvent();
    }
  }

  /**
   * 暂停队列
   */
  pause() {
    this.status = 'pause';
  }

  /**
   * 恢复队列
   */
  async resume() {
    this.status = 'resume';
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
   * 删除队列中的某个任务
   * @param fn 如果是函数，会根据函数的toString方法来判断是否是同一个函数，否则自动删除waitList中的最后一个任务
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

  private async run() {
    if (this.allowStart.includes(this.status)) {
      return;
    }

    this.status = 'running';

    this.runOnEvent('running');
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

    // 错误重试
    if (
      isError(fnResult) &&
      this.retryCount &&
      (!record._retryCount || record._retryCount < this.retryCount)
    ) {
      record._retryCount = record._retryCount ? record._retryCount + 1 : 1;
      this.operationalFn(record);
    } else {
      if (this.status === 'running' && !record._remove) {
        this.runOnEvent('success', fnResult, record._id);
      }

      // 当前任务执行完毕，将结果存入结果集，即使任务被删除，也要存 空 进入结果集
      this.resultList[record._id] = fnResult;

      this.runningIndex++;

      // 当前任务执行完毕，从runningList中删除
      this.runningList.splice(
        this.runningList.findIndex((item) => item._id === record._id),
        1
      );

      if (this.allowStart.includes(this.status) || record._remove) {
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

  private async traverseRunningList() {
    // 循环去遍历 runningList
    for (let i = 0; i < this.maxConcurrency; i++) {
      if (this.allowStart.includes(this.status)) {
        break;
      }

      const record = this.runningList[i];

      if (!record) {
        break;
      }

      // 如果是 undefined 抛出错误
      if (this.runningIndex < this.cacheList.length) {
        if (isNullOrUndefined(record.fn)) {
          const error = new Error(
            `${record.fn} is undefined, the subscript is ${this.runningIndex}`
          );
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
