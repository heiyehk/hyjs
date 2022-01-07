/**
 * 防抖函数
 * @param fn
 * @param delay
 * @returns
 */
export var debounce = function (fn, delay) {
    var _this = this;
    if (delay === void 0) { delay = 1000; }
    var timer = null;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(_this, args);
        }, delay);
    };
};
/**
 * 节流函数
 * @param fn
 * @param delay
 * @returns
 */
export var throttle = function (fn, delay) {
    var _this = this;
    if (delay === void 0) { delay = 500; }
    var flag = true;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!flag)
            return;
        flag = false;
        setTimeout(function () {
            fn.apply(_this, args);
            flag = true;
        }, delay);
    };
};
/**
 * 休眠
 * @param time
 * @example
 * ``` ts
  async function() {
    await sleep(3000);
    // 3s ----
    console.log('log');
  }
   ```
 */
export var sleep = function (time) {
    if (time === void 0) { time = 0; }
    return new Promise(function (resolve) { return setTimeout(function () { return resolve(); }, time); });
};
/**
 * 类型获取
 * @param access 参数
 */
export var getAccessType = function (access) {
    return Object.prototype.toString.call(access).slice(8, -1);
};
