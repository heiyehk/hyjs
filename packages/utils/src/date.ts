type HyjsDateFormatterType = 'YYYY' | 'YY' | 'MM' | 'DD' | 'HH' | 'hh' | 'mm' | 'ss';
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
export const dateFormatter = (formatter: string, date?: string | Date) => {
  const dateAfter = date ? new Date(date) : new Date();

  if (isNaN(dateAfter.getTime())) {
    throw new Error(`Invalid date: ${date}`);
  }

  const Y = dateAfter.getFullYear();
  const M = dateAfter.getMonth() + 1;
  const D = dateAfter.getDate();
  const H = dateAfter.getHours();
  const m = dateAfter.getMinutes();
  const s = dateAfter.getSeconds();

  const formatNumber = (n: number) => String(n < 10 ? '0' + n : n);

  const matches: Record<HyjsDateFormatterType | string, number> = {
    YYYY: Y,
    YY: Y % 100,
    MM: M,
    DD: D,
    HH: H,
    hh: H % 12 || 12,
    mm: m,
    ss: s
  };

  return formatter.replace(/YYYY|YY|MM|DD|HH|hh|mm|ss/g, (match) => {
    return matches[match] !== undefined ? formatNumber(matches[match]) : match;
  });
};
