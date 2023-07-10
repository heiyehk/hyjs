export declare type AccessType = 'String' | 'Object' | 'Number' | 'Boolean' | 'Symbol' | 'Undefined' | 'Null' | 'Function' | 'AsyncFunction' | 'Date' | 'Array' | 'RegExp' | 'Error' | 'Promise' | 'global';
/**
 * 类型获取
 * @param access 参数
 */
export declare const getAccessType: (access: any) => AccessType;
export declare const isNullOrUndefined: (access: any) => boolean;
export declare const isError: (access: any) => boolean;
