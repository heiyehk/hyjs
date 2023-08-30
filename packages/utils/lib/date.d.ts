/**
 * 时间格式化
 * @param formatter 'YYYY-MM-DD hh:mm:ss'
 * @param date
 * @example
 * ``` ts
    dateFormatter('YYYY-MM-DD hh:mm:ss');
    // 2022-01-13 12:00:00

    dateFormatter('YYYY-MM-DD hh:mm:ss', 'Thu Jan 13 2022 12:00:00 GMT+0800 (中国标准时间)')
    // 2022-01-13 12:00:00
    ```
 */
export declare const dateFormatter: (formatter: string, date?: string | Date) => string;
