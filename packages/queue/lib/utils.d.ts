export declare type AccessType = 'Window' | 'String' | 'Object' | 'Number' | 'Boolean' | 'Symbol' | 'Undefined' | 'Null' | 'Function' | 'AsyncFunction' | 'Date' | 'Array' | 'RegExp' | 'Error' | 'Promise' | 'HTMLDocument' | 'global';
/**
 * 类型获取
 * @param access 参数
 */
export declare const getAccessType: (access: any) => AccessType;
