import type { QueueEvent, QueueOptions, QueueParams, WaitFn } from './type';
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
    /**
     * listener event
     * Will be called when the event is triggered, and the event will be passed into the parameter list of the listener
     * @param event event name `success` | `start` | `stop` | `pause` | `resume` | `running` | `finish` | `error`
     * @param listener
     */
    on(event: QueueEvent, listener: (...args: any[]) => void): void;
    /**
     * start execution queue
     */
    start(): void;
    /**
     * stop queue
     * @param finish Whether to execute the finish event
     * @default false
     */
    stop(finish?: boolean): Promise<void>;
    /**
     * pause queue
     */
    pause(): void;
    /**
     * resume queue
     */
    resume(): void;
    add(fn: WaitFn | Promise<WaitFn>): void;
    add(fn: WaitFn | Promise<WaitFn>, index?: number): void;
    /**
     * Delete a task from the queue
     * @param fn If it is a function,
     * it will judge whether it is the same function according to the toString method of the function,
     * otherwise,
     * the last task in the waitList will be automatically deleted
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
