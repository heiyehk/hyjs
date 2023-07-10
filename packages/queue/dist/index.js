(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.__Queue__ = factory());
})(this, (function () { 'use strict';

    var __assign = (undefined && undefined.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
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
    var __read = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    /**
     * 类型获取
     * @param access 参数
     */
    var getAccessType = function (access) {
        return Object.prototype.toString.call(access).slice(8, -1);
    };
    var isNullOrUndefined = function (access) { return access === null || access === undefined; };
    var Queue = /** @class */ (function () {
        function Queue(params, options) {
            this.status = 'stop';
            this.cacheList = [];
            this.waitList = [];
            this.runningList = [];
            this.resultList = [];
            this.runningIndex = 0;
            this.maxConcurrency = 6;
            this.maxQueue = 1;
            this.timeout = 1000;
            this.retry = 3;
            this.retryDelay = 1000;
            this.retryBackoff = 1;
            this.retryJitter = 1;
            this.retryMaxDelay = 1000;
            this.retryMaxAttempts = 3;
            this.retryHandle = function (error, retryCount) { return true; };
            this.retryFilter = function (error, retryCount) { return true; };
            this.retryTimeout = 1000;
            this.retryOnTimeout = true;
            this.events = {};
            this.allowStart = ['stop', 'pause', 'resume', 'error', 'timeout'];
            this.notAllowStart = ['start', 'running'];
            this.allowStop = ['start', 'running', 'pause', 'resume', 'error', 'timeout'];
            this.allowPause = ['running', 'error', 'timeout'];
            this.allowResume = ['pause', 'error', 'timeout'];
            if (getAccessType(params) === 'Object') {
                this.init(params);
            }
            else {
                this.init(__assign({ waitList: params }, options));
            }
        }
        Queue.prototype.init = function (params) {
            var waitList = __spreadArray([], __read((params.waitList || this.cacheList)), false).map(function (item, index) { return ({
                _id: index,
                fn: item
            }); });
            this.cacheList = __spreadArray([], __read(waitList), false);
            this.waitList = waitList;
            this.maxConcurrency = params.maxConcurrency || this.maxConcurrency;
            this.maxQueue = params.maxQueue || this.maxQueue;
            this.timeout = params.timeout || this.timeout;
            this.retry = params.retry || this.retry;
            this.retryDelay = params.retryDelay || this.retryDelay;
            this.retryBackoff = params.retryBackoff || this.retryBackoff;
            this.retryJitter = params.retryJitter || this.retryJitter;
            this.retryMaxDelay = params.retryMaxDelay || this.retryMaxDelay;
            this.retryMaxAttempts = params.retryMaxAttempts || this.retryMaxAttempts;
            this.retryHandle = params.retryHandle || this.retryHandle;
            this.retryFilter = params.retryFilter || this.retryFilter;
            this.retryTimeout = params.retryTimeout || this.retryTimeout;
            this.retryOnTimeout = params.retryOnTimeout || this.retryOnTimeout;
            this.runningList = this.waitList.splice(0, this.maxConcurrency);
        };
        Queue.prototype.on = function (event, listener) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(listener);
        };
        Queue.prototype.start = function () {
            if (this.notAllowStart.includes(this.status)) {
                throw new Error("\u5F53\u524D\u72B6\u6001\u4E3A".concat(this.status, "\uFF0C\u4E0D\u5141\u8BB8\u6267\u884Cstart"));
            }
            this.status = 'start';
            this.runOnEvent('start');
            this.run();
        };
        Queue.prototype.stop = function () {
            console.log('stop');
        };
        Queue.prototype.pause = function () {
            console.log('pause');
        };
        Queue.prototype.resume = function () {
            console.log('resume');
        };
        Queue.prototype.add = function (fn) {
            console.log(fn);
        };
        Queue.prototype.remove = function (fn) {
            console.log(fn);
        };
        Queue.prototype.clear = function () {
            console.log('clear');
        };
        Queue.prototype.run = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.allowStart.includes(this.status)) {
                                return [2 /*return*/];
                            }
                            this.status = 'running';
                            this.runOnEvent('running');
                            return [4 /*yield*/, this.traverseRunningList()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Queue.prototype.fnToPromiseFn = function (fn) {
            return new Promise(function (resolve, reject) {
                try {
                    var result = fn();
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        Queue.prototype.operationalFn = function (record) {
            return __awaiter(this, void 0, void 0, function () {
                var fnResult, _a, _b, nextFn;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!(getAccessType(record.fn) !== 'Function')) return [3 /*break*/, 2];
                            _b = (_a = console).log;
                            return [4 /*yield*/, record.fn];
                        case 1:
                            _b.apply(_a, [_c.sent(), this.runningIndex]);
                            return [2 /*return*/, new Error("".concat(record.fn.toString(), " is not a function, the subscript is ").concat(this.runningIndex))];
                        case 2: return [4 /*yield*/, this.fnToPromiseFn(record.fn).then(function (res) {
                                return res;
                            })];
                        case 3:
                            fnResult = _c.sent();
                            this.runOnEvent('success', fnResult);
                            _c.label = 4;
                        case 4:
                            // 当前任务执行完毕，将结果存入结果集
                            this.resultList[record._id] = fnResult;
                            this.runningList.splice(this.runningList.findIndex(function (item) { return item._id === record._id; }), 1);
                            this.runningIndex++;
                            if (this.waitList.length > 0 && this.runningIndex <= this.cacheList.length - 1) {
                                nextFn = this.waitList.shift();
                                this.runningList.push(nextFn);
                                this.operationalFn(nextFn);
                            }
                            if (this.waitList.length === 0 && this.runningList.length === 0) {
                                this.status = 'finish';
                                this.runningIndex = 0;
                                this.runOnEvent('finish', this.resultList);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        Queue.prototype.traverseRunningList = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i, record, _a, _b, error;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            i = 0;
                            _c.label = 1;
                        case 1:
                            if (!(i < this.maxConcurrency)) return [3 /*break*/, 5];
                            record = this.runningList[i];
                            if (!(this.runningIndex < this.cacheList.length)) return [3 /*break*/, 4];
                            if (!isNullOrUndefined(record.fn)) return [3 /*break*/, 3];
                            _b = (_a = console).log;
                            return [4 /*yield*/, record.fn];
                        case 2:
                            _b.apply(_a, [_c.sent()]);
                            this.runOnEvent('error', new Error("".concat(record.fn.toString(), " is undefined, the subscript is ").concat(this.runningIndex)));
                            _c.label = 3;
                        case 3:
                            error = this.operationalFn(record);
                            if (error)
                                throw error;
                            _c.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 1];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        Queue.prototype.runOnEvent = function (event) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (this.events[event] && this.events[event].length) {
                for (var i = 0; i < this.events[event].length; i++) {
                    (_a = this.events[event])[i].apply(_a, __spreadArray([], __read(args), false));
                }
            }
        };
        return Queue;
    }());
    var a = [];
    var aaa = function (b) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(b);
            }, 1000);
        });
    };
    a.push(aaa('aaaaaaaaa'));
    // a.push(aaa.bind(null, 'aaaaaaaaa'));
    var jsAsyncTemp = function () {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve('{{code}}');
            }, 1000);
        });
    };
    var jsSyncTemp = function () {
        return '{{code}}';
    };
    for (var i = 0; i < 10; i++) {
        var sc = String.fromCharCode(65 + i);
        var s = jsSyncTemp.toString().replace('{{code}}', sc);
        if (i % 2 === 0) {
            s = jsAsyncTemp.toString().replace('{{code}}', sc);
        }
        a.push(eval("(".concat(s, ")")));
    }
    var queue = new Queue(a, {
        maxConcurrency: 1
    });
    var start_time = 0;
    var end_time = 0;
    queue.on('start', function () {
        start_time = performance.now();
    });
    queue.on('finish', function (e) {
        console.log('finish===', e);
        end_time = performance.now();
        console.log('耗时：' + (end_time - start_time) + '微秒。');
    });
    queue.start();

    return Queue;

}));
