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
    if (isNaN(dateAfter.getTime())) {
        throw new Error("Invalid date: ".concat(date));
    }
    var Y = dateAfter.getFullYear();
    var M = dateAfter.getMonth() + 1;
    var D = dateAfter.getDate();
    var H = dateAfter.getHours();
    var m = dateAfter.getMinutes();
    var s = dateAfter.getSeconds();
    var formatNumber = function (n) { return String(n < 10 ? '0' + n : n); };
    var matches = {
        YYYY: Y,
        YY: Y % 100,
        MM: M,
        DD: D,
        HH: H,
        hh: H % 12 || 12,
        mm: m,
        ss: s
    };
    return formatter.replace(/YYYY|YY|MM|DD|HH|hh|mm|ss/g, function (match) {
        return matches[match] !== undefined ? formatNumber(matches[match]) : match;
    });
};
