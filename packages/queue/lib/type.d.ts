export declare type WaitFn = (...args: any[]) => void;
export declare type WaitFunction = WaitFn | Promise<WaitFn>;
export declare type SignWaitRecord = {
    _id: number;
    _remove?: boolean;
    /** 错误重试次数 */
    _retryCount?: number;
    fn: WaitFunction;
};
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
export declare type QueueOptions = {
    /** 等待队列 */
    waitList: WaitFunction[];
    /** 最大并发数 */
    maxConcurrency: number;
    /** 错误重试次数 */
    retryCount: number;
};
export declare type QueueParams = Partial<QueueOptions> | WaitFunction[];
export declare type QueueEvent = 'success' | 'start' | 'stop' | 'pause' | 'resume' | 'running' | 'finish' | 'error';
