declare type FunctionalControl = (this: any, fn: any, delay?: number) => (...args: any) => void;
declare type DebounceEvent = FunctionalControl;
declare type ThrottleEvent = FunctionalControl;
/**
 * 防抖函数
 * @param fn
 * @param delay
 * @returns
 */
export declare const debounce: DebounceEvent;
/**
 * 节流函数
 * @param fn
 * @param delay
 * @returns
 */
export declare const throttle: ThrottleEvent;
/**
 * uuid
 * @returns
 */
export declare const uuid: () => string;
/**
 * file转化base64
 * @param file 文件
 */
export declare const fileReaderToBase64: (file: File) => Promise<string>;
/**
 * base64转文件格式
 * @param urlData base64
 * @param type 类型`file`，`blob`
 * @param filename 如果选了`file`必须使用`filename`
 */
export declare const convertBase64UrlToBlob: (urlData: string, type?: "file" | undefined, filename?: string | undefined) => Blob;
/**
 * 流文件下载
 * @param data 流
 * @param type 类型，比如`application/json;charset=UTF-8`，`image/jpeg`
 * @param filename 文件名
 */
export declare const downloadFile: (data: Blob, type: string, filename?: string) => void;
/**
 * 图片压缩
 * @param file 图片文件
 * @param quality 压缩比率，0.8是正常，越小图片可能不清晰
 * @return 返回一个Promise类型的Blob文件
 */
export declare const compressImage: (file: File, quality?: number) => Promise<Blob>;
declare type AccessType = 'String' | 'Object' | 'Number' | 'Boolean' | 'Symbol' | 'Undefined' | 'Null' | 'Function' | 'Date' | 'Array' | 'RegExp' | 'Error' | 'HTMLDocument' | 'global';
/**
 * 类型获取
 * @param access 参数
 */
export declare const getAccessType: (access: any) => AccessType;
/**
 * 过滤不需要的内容
 * @param data 数据
 * @param validation 过滤值
 */
export declare const filterParamsEmpty: <T extends Record<string, any>>(data: T, validation?: (number | "" | null | undefined)[] | undefined) => T;
/**
 * 是否是IE
 * @returns
 */
export declare const ieIE: () => boolean;
/**
 * 获取视频时长
 * @param file
 * @returns
 */
export declare const getVideoDuration: (file: File) => Promise<unknown>;
/**
 * 是否是pc端
 * @returns
 */
export declare const isPc: () => boolean;
/**
 * 下划线转驼峰
 * @param name
 * @returns
 */
export declare const toHump: (name: string) => string;
/**
 * 驼峰转换下划线
 * @param name
 * @returns
 */
export declare const toLine: (name: string) => string;
/**
 * 休眠
 * @param time
 * @returns
 */
export declare const sleep: (time?: number) => Promise<void>;
export {};
