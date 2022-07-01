/**
 * 是否移动端
 * @returns
 * @example
 */
export declare const isMobile: () => boolean;
/**
 * 获取当前设备 `iOS` | `Android` | `Web`
 * @returns
 */
export declare const getDevice: () => "Android" | "iOS" | "Web";
/**
 * 是否IE
 * @returns
 */
export declare const ieIE: () => boolean;
/**
 * 获取当前微信环境
 * - `wx` 微信环境内
 * - `mini-wx` 小程序内
 * - `no-wx` 非微信
 * @returns
 */
export declare const getWxEnv: () => Promise<'wx' | 'mini-wx' | 'no-wx' | ''>;
