/**
 * get current local time
 * @param {string} timezone
 */
export declare const getLocalTime: (timezone?: string) => string;
declare type AccessType = 'Promise' | 'AsyncFunction' | 'String' | 'Object' | 'Number' | 'Boolean' | 'Symbol' | 'Undefined' | 'Null' | 'Function' | 'Date' | 'Array' | 'RegExp' | 'Error' | 'HTMLDocument' | 'global';
/**
 * 类型获取
 * @param access 参数
 */
export declare const getAccessType: (access: any) => AccessType | string;
export {};
