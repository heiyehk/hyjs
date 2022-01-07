/**
 * 防抖函数
 * @param fn
 * @param delay
 * @returns
 */
export declare const debounce: (this: any, fn: any, delay?: number) => (...args: any) => void;
/**
 * 节流函数
 * @param fn
 * @param delay
 * @returns
 */
export declare const throttle: (this: any, fn: any, delay?: number) => (...args: any) => void;
/**
 * 休眠
 * @param time
 * @example
 * ``` ts
  async function() {
    await sleep(3000);
    // 3s ----
    console.log('log');
  }
   ```
 */
export declare const sleep: (time?: number) => Promise<void>;
declare type AccessType = 'String' | 'Object' | 'Number' | 'Boolean' | 'Symbol' | 'Undefined' | 'Null' | 'Function' | 'Date' | 'Array' | 'RegExp' | 'Error' | 'HTMLDocument' | 'global';
/**
 * 类型获取
 * @param access 参数
 */
export declare const getAccessType: (access: any) => AccessType;
export {};
