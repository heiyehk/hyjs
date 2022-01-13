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
export var dateFormatter = function (formatter, date) {
    var dateAfter = date ? new Date(date) : new Date();
    var Y = dateAfter.getFullYear() + '';
    var M = dateAfter.getMonth() + 1;
    var D = dateAfter.getDate();
    var H = dateAfter.getHours();
    var m = dateAfter.getMinutes();
    var s = dateAfter.getSeconds();
    return formatter
        .replace(/YYYY|yyyy/g, Y)
        .replace(/YY|yy/g, Y.substring(2, 2))
        .replace(/MM/g, (M < 10 ? '0' : '') + M)
        .replace(/DD/g, (D < 10 ? '0' : '') + D)
        .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
        .replace(/mm/g, (m < 10 ? '0' : '') + m)
        .replace(/ss/g, (s < 10 ? '0' : '') + s);
};
