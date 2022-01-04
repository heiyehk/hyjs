var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (undefined && undefined.__values) || function(o) {
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
 * 防抖函数
 * @param fn
 * @param delay
 * @returns
 */
var debounce = function (fn, delay) {
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
var throttle = function (fn, delay) {
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
 * 生成随机4位数code
 * @returns
 */
var randomCode = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
/**
 * 生成uuid
 * @returns
 */
var uuid = function () {
    return (randomCode() +
        randomCode() +
        '-' +
        randomCode() +
        '-' +
        randomCode() +
        '-' +
        randomCode() +
        '-' +
        randomCode() +
        randomCode() +
        randomCode());
};
/**
 * file转化base64
 * @param file 文件
 */
var fileReaderToBase64 = function (file) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (res) {
            resolve(res.currentTarget.result);
        };
        reader.onerror = function (e) { return reject(e); };
    });
};
/**
 * base64转文件格式
 * @param urlData base64
 * @param type 类型`file`，`blob`
 * @param filename 如果选了`file`必须使用`filename`
 */
var convertBase64UrlToBlob = function (urlData, type, filename) {
    var arr = urlData.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    if (type === 'file' && filename) {
        return new File([u8arr], filename, { type: mime });
    }
    return new Blob([u8arr], {
        type: mime
    });
};
/**
 * 流文件下载
 * @param data 流
 * @param type 类型，比如`application/json;charset=UTF-8`，`image/jpeg`
 * @param filename 文件名
 */
var downloadFile = function (data, type, filename) {
    if (filename === void 0) { filename = 'download'; }
    var blob = new Blob([data], { type: type });
    var objectUrl = URL.createObjectURL(blob);
    var elA = document.createElement('a');
    elA.href = objectUrl;
    elA.download = filename;
    // elA.click();
    // 下面这个写法兼容火狐
    elA.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    elA = null;
    window.URL.revokeObjectURL(objectUrl);
};
/**
 * 图片压缩
 * @param file 图片文件
 * @param quality 压缩比率，0.8是正常，越小图片可能不清晰
 * @return 返回一个Promise类型的Blob文件
 */
var compressImage = function (file, quality) {
    if (quality === void 0) { quality = 0.8; }
    return __awaiter(void 0, void 0, void 0, function () {
        var base64;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fileReaderToBase64(file)];
                case 1:
                    base64 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var image = new Image();
                            image.src = base64;
                            image.onload = function (e) {
                                console.log(e);
                                var imageTarget = e.path[0];
                                var width = imageTarget.width, height = imageTarget.height;
                                var canvas = document.createElement('canvas');
                                var context = canvas.getContext('2d');
                                canvas.width = width;
                                canvas.height = height;
                                context === null || context === void 0 ? void 0 : context.clearRect(0, 0, width, height);
                                context === null || context === void 0 ? void 0 : context.drawImage(imageTarget, 0, 0, width, height);
                                canvas.toBlob(function (blob) {
                                    resolve(blob);
                                }, 'image/jpeg', quality);
                                return;
                            };
                            image.onerror = function (e) { return reject(e); };
                        })];
            }
        });
    });
};
/**
 * 类型获取
 * @param access 参数
 */
var getAccessType = function (access) {
    return Object.prototype.toString.call(access).slice(8, -1);
};
/**
 * 过滤不需要的内容
 * @param data 数据
 * @param validation 过滤值
 */
var filterParamsEmpty = function (data, validation) {
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
/**
 * 获取视频时长
 * @param file
 * @returns
 */
var getVideoDuration = function (file) {
    return new Promise(function (resolve) {
        var fileurl = URL.createObjectURL(file);
        var audioElement = new Audio(fileurl);
        var eventListener;
        // eslint-disable-next-line prefer-const
        eventListener = audioElement.addEventListener('loadedmetadata', function () {
            resolve(audioElement.duration);
            audioElement.removeEventListener('loadedmetadata', eventListener);
        });
    });
};
/**
 * 下划线转驼峰
 * @param name
 * @returns
 */
var toHump = function (name) {
    return name.replace(/_(\w)/g, function (_, letter) {
        return letter.toUpperCase();
    });
};
/**
 * 驼峰转换下划线
 * @param name
 * @returns
 */
var toLine = function (name) {
    return name.replace(/([A-Z])/g, '_$1').toLowerCase();
};
/**
 * 休眠
 * @param time
 * @returns
 */
var sleep = function (time) {
    if (time === void 0) { time = 0; }
    return new Promise(function (resolve) { return setTimeout(function () { return resolve(); }, time); });
};
/**
 * 是否是IE
 * @returns
 */
var ieIE = function () { return navigator.userAgent.toLowerCase().indexOf('trident') > -1; };
/**
 * 是否是pc端
 * @returns
 */
var isPC = function () {
    var agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    return !!agents.filter(function (x) { return navigator.userAgent.includes(x); }).length;
};
/**
 * 获取当前设备
 * @returns
 */
var getDevice = function () {
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
 * 随机数字
 * @param min
 * @default 0
 * @param max
 * @returns
 */
var randomNumber = function (min, max) {
    if (min === void 0) { min = 0; }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
/**
 * 阿拉伯数字翻译成中文的大写数字
 * @param num
 * @returns
 */
var numberToChinese = function (num) {
    var digital = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    var unit = ['', '十', '百', '仟', '萬', '億', '点', ''];
    var splitNumber = String(num).replace(/(^0*)/g, '').split('.');
    var index = 0;
    var chineseNumber = '';
    var len = splitNumber[0].length - 1;
    for (; len >= 0; len--) {
        switch (index) {
            case 0:
                chineseNumber = unit[7] + chineseNumber;
                break;
            case 4:
                if (!new RegExp('0{4}//d{' + (splitNumber[0].length - len - 1) + '}$').test(splitNumber[0]))
                    chineseNumber = unit[4] + chineseNumber;
                break;
            case 8:
                chineseNumber = unit[5] + chineseNumber;
                unit[7] = unit[5];
                index = 0;
                break;
        }
        if (index % 4 === 2 &&
            splitNumber[0].charAt(len + 2) !== '0' &&
            splitNumber[0].charAt(len + 1) == '0')
            chineseNumber = digital[0] + chineseNumber;
        if (splitNumber[0].charAt(len) !== '0')
            chineseNumber = digital[Number(splitNumber[0].charAt(len))] + unit[index % 4] + chineseNumber;
        index++;
    }
    if (splitNumber.length > 1) {
        // 加上小数部分(如果有小数部分)
        chineseNumber += unit[6];
        for (var i = 0; i < splitNumber[1].length; i++)
            chineseNumber += digital[Number(splitNumber[1].charAt(i))];
    }
    if (chineseNumber === '一十')
        chineseNumber = '十';
    if (chineseNumber.match(/^一/) && chineseNumber.length === 3)
        chineseNumber = chineseNumber.replace('一', '');
    return chineseNumber;
};
/**
 * 数字转大写金额
 * @param num
 * @returns
 */
var convertCurrency = function (money) {
    // 汉字的数字
    var cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    // 基本单位
    var cnIntRadice = ['', '拾', '佰', '仟'];
    // 对应整数部分扩展单位
    var cnIntUnits = ['', '万', '亿', '兆'];
    // 对应小数部分单位
    var cnDecUnits = ['角', '分', '毫', '厘'];
    // 整数金额时后面跟的字符
    var cnInteger = '整';
    // 整型完以后的单位
    var cnIntLast = '元';
    // 最大处理的数字
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    var maxNum = 999999999999999.9999;
    // 金额整数部分
    var integerNum;
    // 金额小数部分
    var decimalNum;
    // 输出的中文金额字符串
    var chineseStr = '';
    // 分离金额后用的数组，预定义
    var parts;
    if (!money)
        return '';
    money = parseFloat(money);
    if (money >= maxNum) {
        // 超出最大处理数字
        return '';
    }
    if (money == 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
    }
    // 转换为字符串
    money = money.toString();
    if (money.indexOf('.') == -1) {
        integerNum = money;
        decimalNum = '';
    }
    else {
        parts = money.split('.');
        integerNum = parts[0];
        decimalNum = parts[1].substr(0, 4);
    }
    // 获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n == '0') {
                zeroCount++;
            }
            else {
                if (zeroCount > 0) {
                    chineseStr += cnNums[0];
                }
                // 归零
                zeroCount = 0;
                chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
                chineseStr += cnIntUnits[q];
            }
        }
        chineseStr += cnIntLast;
    }
    // 小数部分
    if (decimalNum != '') {
        var decLen = decimalNum.length;
        for (var i = 0; i < decLen; i++) {
            var n = decimalNum.substr(i, 1);
            if (n != '0') {
                chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
        }
    }
    if (chineseStr == '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
    }
    else if (decimalNum == '') {
        chineseStr += cnInteger;
    }
    return chineseStr;
};

export { compressImage, convertBase64UrlToBlob, convertCurrency, debounce, downloadFile, fileReaderToBase64, filterParamsEmpty, getAccessType, getDevice, getVideoDuration, ieIE, isPC, numberToChinese, randomCode, randomNumber, sleep, throttle, toHump, toLine, uuid };
