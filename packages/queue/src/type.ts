export type WaitFn = (...args: any[]) => void;
export type WaitFunction = WaitFn | Promise<WaitFn>;
export type SignWaitRecord = { _id: number; fn: WaitFunction };

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
export type QueueOptions = {
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
export type QueueParams = Partial<QueueOptions> | WaitFunction[];

export type QueueEvent =
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
