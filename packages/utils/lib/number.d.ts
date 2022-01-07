/**
 * 阿拉伯数字翻译成中文的大写数字
 * @param num
 * @returns
 */
export declare const numberToChinese: (num: number | string) => string;
/**
 * 数字转大写金额
 * @param num
 * @returns
 */
export declare const convertCurrency: (money: number | string) => string;
/**
 * 指定范围内生成随机数字, 默认最小值是0
 * @param min
 * @default 0
 * @param max
 * @example
 * ``` ts
    randomNumber(100);
    // 32

    randomNumber(1, 3);
    // 2
    ```
 */
export declare const randomNumber: (min: number | undefined, max: number) => number;
