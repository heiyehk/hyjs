(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.__utils__ = {}));
})(this, (function (exports) { 'use strict';

    /* eslint-disable @typescript-eslint/ban-ts-comment */
    /**
     * 是否移动端
     * @returns
     * @example
     */
    var isMobile = function () {
        var agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
        return !!agents.filter(function (x) { return navigator.userAgent.includes(x); }).length;
    };
    /**
     * 获取当前设备 `iOS` | `Android` | `Web`
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
     * 是否IE
     * @returns
     */
    var ieIE = function () { return navigator.userAgent.toLowerCase().indexOf('trident') > -1; };
    /**
     * 获取当前微信环境
     * - `wx` 微信环境内
     * - `mini-wx` 小程序内
     * - `no-wx` 非微信
     * @returns
     */
    var getWxEnv = function () {
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
    /**
     * file转化base64
     * @param file 文件
     */
    var fileToBase64 = function (file) {
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
     * @param base64 base64
     * @param type 类型`file`，`blob`
     * @param filename 如果选了`file`必须使用`filename`
     * @example
     * ``` ts
     * await convertBase64ToFile(base64, 'file', 'filename');
       // Promise<File>

       await convertBase64ToFile(base64, 'blob', 'filename');
       // Promise<Blob>
        ```
     */
    var convertBase64ToFile = function (base64, type, filename) {
        var arr = base64.split(',');
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
     * @example
     * ``` ts
     * downloadFile(data, 'image/jpeg', 'filename');
       // filename.jpeg
       ```
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
                    case 0: return [4 /*yield*/, fileToBase64(file)];
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
     * 获取视频/音频时长
     * @param file
     * @returns 秒/s
     */
    var getAudioDuration = function (file) {
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
    var sleep = function (time) {
        if (time === void 0) { time = 0; }
        return new Promise(function (resolve) { return setTimeout(function () { return resolve(); }, time); });
    };
    /**
     * 类型获取
     * @param access 参数
     */
    var getAccessType = function (access) {
        return Object.prototype.toString.call(access).slice(8, -1);
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
    /**
     * 指定范围内生成随机数字, 默认最小值是0
     * @param min
     * @default 0
     * @param max
     * @example
     * ``` ts
        randomNumber(100);
        // 32

        randomNumber(1, 3);
        // 2
        ```
     */
    var randomNumber = function (min, max) {
        if (min === void 0) { min = 0; }
        return Math.floor(Math.random() * (max - min + 1)) + min;
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
    var filterObjectEmpty = function (data, validation) {
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
     * https://github.com/any86/any-rule
     * @see https://github.com/any86/any-rule/blob/cfc0ce47c47aa39bae31a5328f7ccfaeeb91dd63/packages/www/src/RULES.js
     * @author any86
     */
    /**
     * 火车车次
     *
     * @example
     * G1868,D102,D9,Z5,Z24,Z17
     */
    var RegExpTrain = /^[GCDZTSPKXLY1-9]\d{1,4}$/;
    /**
     * 手机机身码(IMEI)
     *
     * @example
     * 123456789012345,1234567890123456,12345678901234567
     */
    var RegExpIMEI = /^\d{15,17}$/;
    /**
     * 必须带端口号的网址(或ip)
     *
     * @example
     * https://www.qq.com:8080,127.0.0.1:5050,baidu.com:8001,http://192.168.1.1:9090
     */
    var RegExpIP = /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/;
    /**
     * 网址(URL)
     *
     * @example
     * www.qq.com,https://vuejs.org/v2/api/#v-model,www.qq.99,//www.qq.com,www.腾讯.cs,ftp://baidu.qq,http://baidu.com,https://www.amap.com/search?id=BV10060895&city=420111&geoobj=113.207951%7C29.992557%7C115.785782%7C31.204369&query_type=IDQ&query=%E5%85%89%E8%B0%B7%E5%B9%BF%E5%9C%BA(%E5%9C%B0%E9%93%81%E7%AB%99)&zoom=10.15,360.com:8080/vue/#/a=1&b=2
     */
    var RegExpURL = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
    /**
     * 统一社会信用代码
     *
     * @example
     * 91230184MA1BUFLT44,92371000MA3MXH0E3W
     */
    var RegExpSocialCreditCodeStrict = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
    /**
     * 统一社会信用代码(宽松匹配)(15位/18位/20位数字/字母)
     *
     * @example
     * 91110108772551611J,911101085923662400
     */
    var RegExpSocialCreditCode = /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/;
    /**
     * 迅雷链接
     *
     * @example
     * thunder://QUEsICdtYWduZXQ6P3h0PXVybjpidGloOjBCQTE0RTUxRkUwNjU1RjE0Qzc4NjE4RjY4NDY0QjZFNTEyNjcyOUMnWlo=
     */
    var RegExpThunder = /^thunderx?:\/\/[a-zA-Z\d]+=$/;
    /**
     * ed2k链接(宽松匹配)
     *
     * @example
     * ed2k://|file|%E5%AF%84%E7%94%9F%E8%99%AB.PARASITE.2019.HD-1080p.X264.AAC-UUMp4(ED2000.COM).mp4|2501554832|C0B93E0879C6071CBED732C20CE577A3|h=5HTKZPQFYRKORN52I3M7GQ4QQCIHFIBV|/
     */
    var RegExpEd2k = /^ed2k:\/\/\|file\|.+\|\/$/;
    /**
     * 磁力链接(宽松匹配)
     *
     * @example
     * magnet:?xt=urn:btih:40A89A6F4FB1498A98087109D012A9A851FBE0FC
     */
    var RegExpMagnet = /^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/;
    /**
     * 子网掩码(不包含 0.0.0.0)
     *
     * @example
     * 255.255.255.0,255.255.255.255,255.240.0.0
     */
    var RegExpSubNet = /^(254|252|248|240|224|192|128)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(255|254|252|248|240|224|192|128|0)$/;
    /**
     * linux"隐藏文件"路径
     *
     * @example
     * /usr/ad/.dd,/root/.gitignore,/.gitignore
     */
    var RegExpLinuxHiddenDirPath = /^\/(?:[^/]+\/)*\.[^/]*/;
    /**
     * linux文件夹路径
     *
     * @example
     * /usr/ad/dd/,/,/root/,/ a a / a / a a /
     */
    var RegExpLinuxDirPath = /^\/(?:[^/]+\/)*$/;
    /**
     * linux文件路径
     *
     * @example
     * /root/b.ts,/root/abc
     */
    var RegExpLinuxFilePath = /^\/(?:[^/]+\/)*[^/]+$/;
    /**
     * window"文件夹"路径
     *
     * @example
     * C:\Users\Administrator\Desktop,e:\m\
     */
    var RegExpWindowsDirPath = /^[a-zA-Z]:\\(?:\w+\\?)*$/;
    /**
     * window下"文件"路径
     *
     * @example
     * C:\Users\Administrator\Desktop\qq.link,e:\m\vscode.exe
     */
    var RegExpWindowsFilePath = /^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/;
    /**
     * 股票代码(A股)
     *
     * @example
     * sz000858,SZ002136,sz300675,SH600600,sh601155
     */
    var RegExpStockA = /^(s[hz]|S[HZ])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$/;
    /**
     * 大于等于0, 小于等于150, 支持小数位出现5, 如145.5, 用于判断考卷分数
     *
     * @example
     * 150,100.5
     */
    var RegExpGrade = /^150$|^(?:\d|[1-9]\d|1[0-4]\d)(?:\.5)?$/;
    /**
     * html注释
     *
     * @example
     * <!--<div class="_bubble"></div>--><div>chenguzhen87</div><div class="_bubble"></div>-->
     */
    var RegExpHTMLAnnotation = /<!--[\s\S]*?-->/g;
    /**
     * md5格式(32位)
     *
     * @example
     * 21fe181c5bfc16306a6828c1f7b762e8
     */
    var RegExpMD5 = /^([a-f\d]{32}|[A-F\d]{32})$/;
    /**
     * GUID/UUID
     *
     * @example
     * e155518c-ca1b-443c-9be9-fe90fdab7345,41E3DAF5-6E37-4BCC-9F8E-0D9521E2AA8D,00000000-0000-0000-0000-000000000000
     */
    var RegExpUuid = /^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/i;
    /**
     * 版本号(version)格式必须为X.Y.Z
     *
     * @example
     * 16.3.10
     */
    var RegExpVersion = /^\d+(?:\.\d+){2}$/;
    /**
     * 视频(video)链接地址（视频格式可按需增删）
     *
     * @example
     * http://www.abc.com/video/wc.avi
     */
    var RegExpVideoUrlPath = /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i;
    /**
     * 图片(image)链接地址（图片格式可按需增删）
     *
     * @example
     * https://www.abc.com/logo.png,http://www.abc.com/logo.png
     */
    var RegExpImageUrlPath = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i;
    /**
     * 24小时制时间（HH:mm:ss）
     *
     * @example
     * 23:34:55
     */
    var RegExp24Time = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
    /**
     * 12小时制时间（hh:mm:ss）
     *
     * @example
     * 11:34:55
     */
    var RegExp12Time = /^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/;
    /**
     * base64格式
     *
     * @example
     * data:image/gif;base64,xxxx==
     */
    var RegExpBase64 = /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i;
    /**
     * 数字/货币金额（支持负数、千分位分隔符）
     *
     * @example
     * 100,-0.99,3,234.32,-1,900,235.09,12,345,678.90
     */
    var RegExpAmount = /^-?\d+(,\d{3})*(\.\d{1,2})?$/;
    /**
     * 数字/货币金额 (只支持正数、不支持校验千分位分隔符)
     *
     * @example
     * 0.99,8.99,666
     */
    var RegExpNumberAmount = /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/;
    /**
     * 银行卡号（10到30位, 覆盖对公/私账户, 参考[微信支付](https://pay.weixin.qq.com/wiki/doc/api/xiaowei.php?chapter=22_1)）
     *
     * @example
     * 6234567890,6222026006705354000
     */
    var RegExpCardNumber = /^[1-9]\d{9,29}$/;
    /**
     * 中文姓名
     *
     * @example
     * 葛二蛋,凯文·杜兰特,德克·维尔纳·诺维茨基
     */
    var RegExpCNName = /^(?:[\u4e00-\u9fa5·]{2,16})$/;
    /**
     * 英文姓名
     *
     * @example
     * James,Kevin Wayne Durant,Dirk Nowitzki
     */
    var RegExpENName = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
    /**
     * 车牌号(新能源)
     *
     * @example
     * 京AD92035,甘G23459F,京AA92035
     */
    var RegExpNewEnergyNumberPlate = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](?:((\d{5}[A-HJK])|([A-HJK][A-HJ-NP-Z0-9][0-9]{4}))|[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳])$/;
    /**
     * 车牌号(非新能源)
     *
     * @example
     * 京A00599,黑D23908
     */
    var RegExpNumberPlate = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]$/;
    /**
     * 车牌号(新能源+非新能源)
     *
     * @example
     * 京A12345D,京A00599,京AD92035,甘G23459F,京AA92035
     */
    var RegExpAllNumberPlate = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/;
    /**
     * 手机号(mobile phone)中国(严谨), 根据工信部2019年最新公布的手机号段
     *
     * @example
     * 008618311006933,+8617888829981,19119255642
     */
    var RegExpMobilePhoneNumberStrict = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
    /**
     * 手机号(mobile phone)中国(宽松), 只要是13,14,15,16,17,18,19开头即可
     *
     * @example
     * 008618311006933,+8617888829981,19119255642
     */
    var RegExpMobilePhoneNunber = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
    /**
     * 手机号(mobile phone)中国(最宽松), 只要是1开头即可, 如果你的手机号是用来接收短信, 优先建议选择这一条
     *
     * @example
     * 008618311006933,+8617888829981,19119255642
     */
    var RegExpMobilePhoneLoose = /^(?:(?:\+|00)86)?1\d{10}$/;
    /**
     * date(日期)
     *
     * @example
     * 1990-12-12,1-1-1,0000-1-1
     */
    var RegExpRungDate = /^\d{1,4}(-)(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31)$/;
    /**
     * 可以被moment转化成功的时间 YYYYMMDD HH:mm:ss
     *
     * @example
     * 2020/01/01 23:59:59,2020-01-01 00:00:00,20200101 11:11:11
     */
    var RegExpDate = /^\d{4}([/:-\S])(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
    /**
     * email(邮箱)
     *
     * @example
     * 90203918@qq.com,nbilly@126.com,汉字@qq.com
     */
    var RegExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /**
     * 座机(tel phone)电话(国内),如: 0341-86091234
     *
     * @example
     * 0936-4211235,89076543,010-12345678-1234
     */
    var RegExpTelPhone = /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/;
    /**
     * 身份证号(1代,15位数字)
     *
     * @example
     * 123456991010193
     */
    var RegExp1IdNumber = /^[1-9]\d{7}(?:0\d|10|11|12)(?:0[1-9]|[1-2][\d]|30|31)\d{3}$/;
    /**
     * 身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X
     *
     * @example
     * 12345619991205131x
     */
    var RegExp2IdNumber = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/;
    /**
     * 身份证号, 支持1/2代(15位/18位数字)
     *
     * @example
     * 622223199912051311,12345619991205131x,123456991010193
     */
    var RegExpIdNumber = /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/;
    /**
     * 护照（包含香港、澳门）
     *
     * @example
     * s28233515,141234567,159203084,MA1234567,K25345719
     */
    var RegExpPassport = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
    /**
     * 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合
     *
     * @example
     * justin,justin1989,justin_666
     */
    var RegExpAccount = /^[a-zA-Z]\w{4,15}$/;
    /**
     * 中文/汉字
     *
     * @example
     * 正则,前端
     */
    var RegExpCN = /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/;
    /**
     * 小数
     *
     * @example
     * 0.0,0.09
     */
    var RegExpDecimals = /^\d+\.\d+$/;
    /**
     * 数字
     *
     * @example
     * 12345678
     */
    var RegExpNumber = /^\d{1,}$/;
    /**
     * html标签(宽松匹配)
     *
     * @example
     * <div id="app"> 2333 </div>,<input type="text">,<br>
     */
    var RegExpHTMLDOM = /<(\w+)[^>]*>(.*?<\/\1>)?/;
    /**
     * qq号格式正确
     *
     * @example
     * 903013545,9020304
     */
    var RegExpQQNumber = /^[1-9][0-9]{4,10}$/;
    /**
     * 数字和字母组成
     *
     * @example
     * james666,haha233hi
     */
    var RegExpAlphanumeric = /^[A-Za-z0-9]+$/;
    /**
     * 英文字母
     *
     * @example
     * Russel
     */
    var RegExpEnglishAlphabet = /^[a-zA-Z]+$/;
    /**
     * 小写英文字母组成
     *
     * @example
     * russel
     */
    var RegExpLowercase = /^[a-z]+$/;
    /**
     * 大写英文字母
     *
     * @example
     * ABC,KD
     */
    var RegExpCapital = /^[A-Z]+$/;
    /**
     * 密码强度校验，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
     *
     * @example
     * Kd@curry666
     */
    var RegExpPasswordStrength = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
    /**
     * 用户名校验，4到16位（字母，数字，下划线，减号）
     *
     * @example
     * xiaohua_qq
     */
    var RegExpUserName = /^[a-zA-Z0-9_-]{4,16}$/;
    /**
     * ip-v4[:端口]
     *
     * @example
     * 172.16.0.0,172.16.0.0:8080,127.0.0.0,127.0.0.0:998
     */
    var RegExpIPV4 = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/;
    /**
     * ip-v6[:端口]
     *
     * @example
     * 2031:0000:130f:0000:0000:09c0:876a:130b,[2031:0000:130f:0000:0000:09c0:876a:130b]:8080
     */
    var RegExpIPV6 = /(^(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$)|(^\[(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))\](?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$)/i;
    /**
     * 16进制颜色
     *
     * @example
     * #f00,#F90,#000,#fe9de8
     */
    var RegExpColor16 = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    /**
     * 微信号(wx)，6至20位，以字母开头，字母，数字，减号，下划线
     *
     * @example
     * github666,kd_-666
     */
    var RegExpWXNumber = /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/;
    /**
     * 邮政编码(中国)
     *
     * @example
     * 734500,100101
     */
    var RegExpPostalCode = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/;
    /**
     * 中文和数字
     *
     * @example
     * 哈哈哈,你好6啊
     */
    var RegExpChineseAndNumbers = /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/;
    /**
     * 不能包含字母
     *
     * @example
     * 你好6啊,@¥()！
     */
    var RegExpNotLetter = /^[^A-Za-z]*$/;
    /**
     * java包名
     *
     * @example
     * com.bbb.name
     */
    var RegExpJavaPackageName = /^([a-zA-Z_]\w*)+([.][a-zA-Z_]\w*)+$/;
    /**
     * mac地址
     *
     * @example
     * 38:f9:d3:4b:f5:51,00-0C-29-CA-E4-66
     */
    var RegExpMac = /^((([a-f0-9]{2}:){5})|(([a-f0-9]{2}-){5}))[a-f0-9]{2}$/i;
    /**
     * 匹配连续重复的字符
     *
     * @example
     * 我我我,112233,11234
     */
    var RegExpContinuousCharacters = /(.)\1+/;
    /**
     * 数字和英文字母组成，并且同时含有数字和英文字母
     *
     * @example
     * 我a我1我,a对1
     */
    var RegExpCharacter = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
    /**
     * 香港身份证
     *
     * @example
     * K034169(1)
     */
    var RegExpHKIDCard = /^[a-zA-Z]\d{6}\([\dA]\)$/;
    /**
     * 澳门身份证
     *
     * @example
     * 5686611(1)
     */
    var RegExpAMIDCard = /^[1|5|7]\d{6}\(\d\)$/;
    /**
     * 台湾身份证
     *
     * @example
     * U193683453
     */
    var RegExpTWIDCard = /^[a-zA-Z][0-9]{9}$/;
    /**
     * 大写字母，小写字母，数字，特殊符号 `@#$%^&*`~()-+=` 中任意3项密码
     *
     * @example
     * a1@,A1@,Aa@
     */
    var RegExpStrongPassword = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/;
    /**
     * 正整数，不包含0
     *
     * @example
     * 1231
     */
    var RegExpPositiveInteger = /^\+?[1-9]\d*$/;
    /**
     * 负整数，不包含0
     *
     * @example
     * -1231
     */
    var RegExpNegativeInteger = /^-[1-9]\d*$/;
    /**
     * 整数
     *
     * @example
     * -1231,123
     */
    var RegExpInteger = /^-?[0-9]\d*$/;
    /**
     * 浮点数
     *
     * @example
     * 1.5
     */
    var RegExpFloatingNumber = /^(-?\d+)(\.\d+)?$/;
    /**
     * email(支持中文邮箱)
     *
     * @example
     * 90203918@qq.com,nbilly@126.com,啦啦啦@126.com
     */
    var RegExpEmailLoose = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

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
     * 驼峰转下划线
     * @param name
     * @returns
     */
    var toLine = function (name) {
        return name.replace(/([A-Z])/g, '_$1').toLowerCase();
    };
    /**
     * 生成随机4位数code
     * @returns
     */
    var random4Code = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    /**
     * 生成指定长度的字符，可选择`number`(数字), `lowercase`(小写字母), `capital`(大写字母)
     * @param len
     * @param char
     * @returns
     */
    var randomChar = function (len, char) {
        if (len === void 0) { len = 4; }
        if (char === void 0) { char = ['number', 'lowercase', 'capital']; }
        var number = '1234567890';
        var lowercase = 'abcdefghijklmnopqrstuvwxyz';
        var capital = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var character = '';
        var backChar = '';
        if (char.includes('number'))
            character += number;
        if (char.includes('lowercase'))
            character += lowercase;
        if (char.includes('capital'))
            character += capital;
        while (len) {
            var randomIndex = Math.floor(Math.random() * character.length);
            backChar += character[randomIndex];
            if (backChar.length === len)
                break;
        }
        return backChar;
    };
    /**
     * 生成uuid
     * @returns
     */
    var uuid = function () {
        return (random4Code() +
            random4Code() +
            '-' +
            random4Code() +
            '-' +
            random4Code() +
            '-' +
            random4Code() +
            '-' +
            random4Code() +
            random4Code() +
            random4Code());
    };

    exports.RegExp12Time = RegExp12Time;
    exports.RegExp1IdNumber = RegExp1IdNumber;
    exports.RegExp24Time = RegExp24Time;
    exports.RegExp2IdNumber = RegExp2IdNumber;
    exports.RegExpAMIDCard = RegExpAMIDCard;
    exports.RegExpAccount = RegExpAccount;
    exports.RegExpAllNumberPlate = RegExpAllNumberPlate;
    exports.RegExpAlphanumeric = RegExpAlphanumeric;
    exports.RegExpAmount = RegExpAmount;
    exports.RegExpBase64 = RegExpBase64;
    exports.RegExpCN = RegExpCN;
    exports.RegExpCNName = RegExpCNName;
    exports.RegExpCapital = RegExpCapital;
    exports.RegExpCardNumber = RegExpCardNumber;
    exports.RegExpCharacter = RegExpCharacter;
    exports.RegExpChineseAndNumbers = RegExpChineseAndNumbers;
    exports.RegExpColor16 = RegExpColor16;
    exports.RegExpContinuousCharacters = RegExpContinuousCharacters;
    exports.RegExpDate = RegExpDate;
    exports.RegExpDecimals = RegExpDecimals;
    exports.RegExpENName = RegExpENName;
    exports.RegExpEd2k = RegExpEd2k;
    exports.RegExpEmail = RegExpEmail;
    exports.RegExpEmailLoose = RegExpEmailLoose;
    exports.RegExpEnglishAlphabet = RegExpEnglishAlphabet;
    exports.RegExpFloatingNumber = RegExpFloatingNumber;
    exports.RegExpGrade = RegExpGrade;
    exports.RegExpHKIDCard = RegExpHKIDCard;
    exports.RegExpHTMLAnnotation = RegExpHTMLAnnotation;
    exports.RegExpHTMLDOM = RegExpHTMLDOM;
    exports.RegExpIMEI = RegExpIMEI;
    exports.RegExpIP = RegExpIP;
    exports.RegExpIPV4 = RegExpIPV4;
    exports.RegExpIPV6 = RegExpIPV6;
    exports.RegExpIdNumber = RegExpIdNumber;
    exports.RegExpImageUrlPath = RegExpImageUrlPath;
    exports.RegExpInteger = RegExpInteger;
    exports.RegExpJavaPackageName = RegExpJavaPackageName;
    exports.RegExpLinuxDirPath = RegExpLinuxDirPath;
    exports.RegExpLinuxFilePath = RegExpLinuxFilePath;
    exports.RegExpLinuxHiddenDirPath = RegExpLinuxHiddenDirPath;
    exports.RegExpLowercase = RegExpLowercase;
    exports.RegExpMD5 = RegExpMD5;
    exports.RegExpMac = RegExpMac;
    exports.RegExpMagnet = RegExpMagnet;
    exports.RegExpMobilePhoneLoose = RegExpMobilePhoneLoose;
    exports.RegExpMobilePhoneNumberStrict = RegExpMobilePhoneNumberStrict;
    exports.RegExpMobilePhoneNunber = RegExpMobilePhoneNunber;
    exports.RegExpNegativeInteger = RegExpNegativeInteger;
    exports.RegExpNewEnergyNumberPlate = RegExpNewEnergyNumberPlate;
    exports.RegExpNotLetter = RegExpNotLetter;
    exports.RegExpNumber = RegExpNumber;
    exports.RegExpNumberAmount = RegExpNumberAmount;
    exports.RegExpNumberPlate = RegExpNumberPlate;
    exports.RegExpPassport = RegExpPassport;
    exports.RegExpPasswordStrength = RegExpPasswordStrength;
    exports.RegExpPositiveInteger = RegExpPositiveInteger;
    exports.RegExpPostalCode = RegExpPostalCode;
    exports.RegExpQQNumber = RegExpQQNumber;
    exports.RegExpRungDate = RegExpRungDate;
    exports.RegExpSocialCreditCode = RegExpSocialCreditCode;
    exports.RegExpSocialCreditCodeStrict = RegExpSocialCreditCodeStrict;
    exports.RegExpStockA = RegExpStockA;
    exports.RegExpStrongPassword = RegExpStrongPassword;
    exports.RegExpSubNet = RegExpSubNet;
    exports.RegExpTWIDCard = RegExpTWIDCard;
    exports.RegExpTelPhone = RegExpTelPhone;
    exports.RegExpThunder = RegExpThunder;
    exports.RegExpTrain = RegExpTrain;
    exports.RegExpURL = RegExpURL;
    exports.RegExpUserName = RegExpUserName;
    exports.RegExpUuid = RegExpUuid;
    exports.RegExpVersion = RegExpVersion;
    exports.RegExpVideoUrlPath = RegExpVideoUrlPath;
    exports.RegExpWXNumber = RegExpWXNumber;
    exports.RegExpWindowsDirPath = RegExpWindowsDirPath;
    exports.RegExpWindowsFilePath = RegExpWindowsFilePath;
    exports.compressImage = compressImage;
    exports.convertBase64ToFile = convertBase64ToFile;
    exports.convertCurrency = convertCurrency;
    exports.debounce = debounce;
    exports.downloadFile = downloadFile;
    exports.fileToBase64 = fileToBase64;
    exports.filterObjectEmpty = filterObjectEmpty;
    exports.getAccessType = getAccessType;
    exports.getAudioDuration = getAudioDuration;
    exports.getDevice = getDevice;
    exports.getWxEnv = getWxEnv;
    exports.ieIE = ieIE;
    exports.isMobile = isMobile;
    exports.numberToChinese = numberToChinese;
    exports.random4Code = random4Code;
    exports.randomChar = randomChar;
    exports.randomNumber = randomNumber;
    exports.sleep = sleep;
    exports.throttle = throttle;
    exports.toHump = toHump;
    exports.toLine = toLine;
    exports.uuid = uuid;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
