/**
 * 是否pc端
 * @returns
 * @example
 */
export var isPC = function () {
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
