/**
 * 防抖函数
 * @param fn
 * @param delay
 * @returns
 */
export const debounce: (this: any, fn: any, delay?: number) => (...args: any) => void = function (
  fn,
  delay = 1000
) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

/**
 * 节流函数
 * @param fn
 * @param delay
 * @returns
 */
export const throttle: (this: any, fn: any, delay?: number) => (...args: any) => void = function (
  fn,
  delay = 500
) {
  let flag = true;
  return (...args: any) => {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
};

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
export const sleep = (time = 0) => {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), time));
};

export type AccessType =
  | 'Window'
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
  | 'HTMLDocument'
  | 'global';

/**
 * 类型获取
 * @param access 参数
 */
export const getAccessType = (access: any) => {
  return Object.prototype.toString.call(access).slice(8, -1) as AccessType;
};
