/**
 * 下划线转驼峰
 * @param name
 * @returns
 */
export declare const toHump: (name: string) => string;
/**
 * 驼峰转下划线
 * @param name
 * @returns
 */
export declare const toLine: (name: string) => string;
/**
 * 生成随机4位数code
 * @returns
 */
export declare const random4Code: () => string;
declare type RandomChar = (len: number, char: ('number' | 'lowercase' | 'capital')[]) => string;
/**
 * 生成指定长度的字符，可选择`number`(数字), `lowercase`(小写字母), `capital`(大写字母)
 * @param len
 * @param char
 * @returns
 */
export declare const randomChar: RandomChar;
/**
 * 生成uuid
 * @returns
 */
export declare const uuid: () => string;
export {};
