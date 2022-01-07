/**
 * 过滤对象内容，如`null`、`undefined`等
 * @param data 数据
 * @param validation 过滤值
 * @example
 * ``` ts
    filterObjectEmpty({
      a: undefined,
      b: null,
      c: '',
      d: 0
    });
    // { d: 0 }

    filterObjectEmpty({
      a: undefined,
      b: 111,
      c: 222
    }, [111, 222]);
    // { a: undefined }
    ```
 */
export const filterObjectEmpty = <T extends Record<string, any>>(
  data: T,
  validation?: (null | undefined | '' | number)[]
): T => {
  const newObj: { [key: string]: any } = {};
  for (const key of Object.keys(data)) {
    if (!validation) {
      if (data[key] !== '' && data[key] !== undefined && data[key] !== null) {
        newObj[key] = data[key];
      }
    } else {
      if (!validation.includes(data[key])) {
        newObj[key] = data[key];
      }
    }
  }
  return newObj as T;
};
