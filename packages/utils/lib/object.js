var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
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
export var filterObjectEmpty = function (data, validation) {
    var e_1, _a;
    var newObj = {};
    try {
        for (var _b = __values(Object.keys(data)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            if (!validation) {
                if (data[key] !== '' && data[key] !== undefined && data[key] !== null) {
                    newObj[key] = data[key];
                }
            }
            else {
                if (!validation.includes(data[key])) {
                    newObj[key] = data[key];
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return newObj;
};
