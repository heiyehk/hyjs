export type WaitFn = (...args: any[]) => void;
export type WaitFunction = WaitFn | Promise<WaitFn>;
export type SignWaitRecord = { _id: number; _remove?: boolean; fn: WaitFunction };

export type AccessType =
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
 * 队列
 * @param waitList 等待队列
 * @param maxConcurrency 最大并发数
 * @returns
 * @example
 * ``` ts
 * const queue = new Queue({
 *   waitList: [fn1, fn2, fn3],
 *   maxConcurrency: 1,
 * });
 * ```
 */
export type QueueOptions = {
  /** 等待队列 */
  waitList: WaitFunction[];
  /** 最大并发数 */
  maxConcurrency: number;
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
  | 'timeout';
