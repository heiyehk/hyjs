/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * 是否移动端
 * @returns
 * @example
 */
export var isMobile = function () {
    var agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    return !!agents.filter(function (x) { return navigator.userAgent.includes(x); }).length;
};
/**
 * 获取当前设备 `iOS` | `Android` | `Web`
 * @returns
 */
export var getDevice = function () {
    var _a, _b, _c;
    // 判断是android还是ios还是web
    var ua = navigator.userAgent.toLowerCase();
    if (((_a = ua.match(/iPhone\sOS/i)) === null || _a === void 0 ? void 0 : _a.includes('iphone os')) || ((_b = ua.match(/iPad/i)) === null || _b === void 0 ? void 0 : _b.includes('ipad'))) {
        return 'iOS';
    }
    if ((_c = ua.match(/Android/i)) === null || _c === void 0 ? void 0 : _c.includes('android'))
        return 'Android';
    return 'Web';
};
/**
 * 是否IE
 * @returns
 */
export var ieIE = function () { return navigator.userAgent.toLowerCase().indexOf('trident') > -1; };
/**
 * 获取当前微信环境
 * - `wx` 微信环境内
 * - `mini-wx` 小程序内
 * - `no-wx` 非微信
 * @returns
 */
export var getWxEnv = function () {
    var ua = navigator.userAgent.toLowerCase();
    var isWXWork = /wxwork/i.test(ua);
    if (!isWXWork && /micromessenger/i.test(ua)) {
        return new Promise(function (resolve) {
            try {
                // @ts-ignore
                wx.miniProgram.getEnv(function (res) {
                    if (res.miniprogram) {
                        resolve('mini-wx');
                    }
                    else {
                        resolve('wx');
                    }
                });
            }
            catch (error) {
                resolve('wx');
                console.error(error);
            }
        });
    }
    else {
        return Promise.resolve('no-wx');
    }
};
