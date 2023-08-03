import type { QueueEvent, QueueOptions, QueueParams, WaitFn } from './type';
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
declare class Queue {
    private waitList;
    private maxConcurrency;
    private retryCount;
    status: QueueEvent;
    private cacheList;
    private runningList;
    private resultList;
    private runningIndex;
    private events;
    private allowStart;
    private notAllowStart;
    constructor(params: QueueParams, options?: Partial<Omit<QueueOptions, 'waitList'>>);
    private fillAttribute;
    private init;
    on(event: QueueEvent, listener: (...args: any[]) => void): void;
    start(): void;
    /**
     * 停止队列
     * @param finish 是否执行finish事件
     */
    stop(finish?: boolean): void;
    /**
     * 暂停队列
     */
    pause(): void;
    /**
     * 恢复队列
     */
    resume(): Promise<void>;
    add(fn: WaitFn | Promise<WaitFn>): void;
    add(fn: WaitFn | Promise<WaitFn>, index?: number): void;
    /**
     * 删除队列中的某个任务
     * @param fn 如果是函数，会根据函数的toString方法来判断是否是同一个函数，否则自动删除waitList中的最后一个任务
     * @returns
     */
    remove(fn?: WaitFn | Promise<WaitFn>): void;
    clear(): void;
    private run;
    private operationalFn;
    private traverseRunningList;
    runOnEvent(event: QueueEvent, ...args: any[]): void;
    finishEvent(): void;
}
export default Queue;
