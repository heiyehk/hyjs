var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
export var fileToBase64 = function (file) {
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
export var convertBase64ToFile = function (base64, type, filename) {
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
export var downloadFile = function (data, type, filename) {
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
export var compressImage = function (file, quality) {
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
export var getAudioDuration = function (file) {
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
 * 文件转buffer
 * @param file
 * @returns
 */
export var fileToBuffer = function (file) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                var fr = new FileReader();
                fr.readAsArrayBuffer(file);
                fr.onloadend = function () { return resolve(fr.result); };
            })];
    });
}); };
