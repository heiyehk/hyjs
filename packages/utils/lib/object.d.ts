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
export declare const filterObjectEmpty: <T extends Record<string, any>>(data: T, validation?: (number | "" | null | undefined)[] | undefined) => T;
