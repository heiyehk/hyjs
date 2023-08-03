// import type { QueueEvent, QueueOptions, QueueParams, SignWaitRecord, WaitFn } from './type';
// import { getAccessType, isNullOrUndefined } from './utils';
var __assign = (this && this.__assign) || function () {
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
var __read = (this && this.__read) || function (o, n) {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
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
var isError = function (access) { return getAccessType(access) === 'Error'; };
var Queue = /** @class */ (function () {
    function Queue(params, options) {
        this.waitList = [];
        this.maxConcurrency = 6;
        this.retryCount = 0;
        this.status = 'stop';
        this.cacheList = [];
        this.runningList = [];
        this.resultList = [];
        this.runningIndex = 0;
        this.events = {};
        this.allowStart = ['stop', 'pause', 'error', 'timeout'];
        this.notAllowStart = ['start', 'running'];
        if (getAccessType(params) === 'Object') {
            this.init(params);
        }
        else {
            this.init(__assign({ waitList: params }, options));
        }
    }
    Queue.prototype.fillAttribute = function (list) {
        return list.map(function (item, index) {
            return {
                fn: item,
                _id: index
            };
        });
    };
    Queue.prototype.init = function (params) {
        var waitList = this.fillAttribute(__spreadArray([], __read((params.waitList || this.cacheList)), false));
        this.cacheList = __spreadArray([], __read(waitList), false);
        this.waitList = __spreadArray([], __read(waitList), false);
        this.maxConcurrency = params.maxConcurrency || this.maxConcurrency;
        this.runningList = this.waitList.splice(0, this.maxConcurrency);
        this.retryCount = params.retryCount || this.retryCount;
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
    /**
     * 停止队列
     * @param finish 是否执行finish事件
     */
    Queue.prototype.stop = function (finish) {
        if (finish === void 0) { finish = false; }
        this.status = 'stop';
        if (finish) {
            this.finishEvent();
        }
    };
    /**
     * 暂停队列
     */
    Queue.prototype.pause = function () {
        this.status = 'pause';
    };
    /**
     * 恢复队列
     */
    Queue.prototype.resume = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.status = 'resume';
                this.traverseRunningList();
                return [2 /*return*/];
            });
        });
    };
    Queue.prototype.add = function (fn, index) {
        if (index !== undefined) {
            this.waitList.splice(index, 0, {
                _id: index,
                fn: fn
            });
            return;
        }
        var _id = this.cacheList.length;
        var record = {
            _id: _id,
            fn: fn
        };
        this.cacheList.push(record);
        this.waitList.push(record);
    };
    /**
     * 删除队列中的某个任务
     * @param fn 如果是函数，会根据函数的toString方法来判断是否是同一个函数，否则自动删除waitList中的最后一个任务
     * @returns
     */
    Queue.prototype.remove = function (fn) {
        if (fn) {
            this.waitList = this.waitList.filter(function (item) { return item.fn.toString() !== fn.toString(); });
        }
        else {
            // 删除最后一个
            if (this.runningList.length) {
                // 如果还有正在等待的任务，删除最后一个
                if (this.waitList.length) {
                    this.waitList.pop();
                }
                this.runningList.pop();
                this.cacheList.pop();
            }
        }
    };
    Queue.prototype.clear = function () {
        this.waitList = [];
        this.runningList = [];
        this.cacheList = [];
        this.resultList = [];
        this.runningIndex = 0;
    };
    Queue.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.allowStart.includes(this.status)) {
                    return [2 /*return*/];
                }
                this.status = 'running';
                this.runOnEvent('running');
                this.traverseRunningList();
                return [2 /*return*/];
            });
        });
    };
    Queue.prototype.operationalFn = function (record) {
        return __awaiter(this, void 0, void 0, function () {
            var fnResult, nextFn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.allowStart.includes(this.status)) {
                            return [2 /*return*/];
                        }
                        if (typeof record.fn !== 'function') {
                            return [2 /*return*/, new Error("".concat(record.fn, " is not a function, the subscript is ").concat(this.runningIndex))];
                        }
                        return [4 /*yield*/, record.fn()];
                    case 1:
                        fnResult = _a.sent();
                        // 错误重试
                        if (isError(fnResult) &&
                            this.retryCount &&
                            (!record._retryCount || record._retryCount < this.retryCount)) {
                            record._retryCount = record._retryCount ? record._retryCount + 1 : 1;
                            this.operationalFn(record);
                        }
                        else {
                            if (this.status === 'running' && !record._remove) {
                                this.runOnEvent('success', fnResult, record._id);
                            }
                            // 当前任务执行完毕，将结果存入结果集，即使任务被删除，也要存 空 进入结果集
                            this.resultList[record._id] = fnResult;
                            this.runningIndex++;
                            // 当前任务执行完毕，从runningList中删除
                            this.runningList.splice(this.runningList.findIndex(function (item) { return item._id === record._id; }), 1);
                            if (this.allowStart.includes(this.status) || record._remove) {
                                return [2 /*return*/];
                            }
                            if (this.waitList.length > 0) {
                                nextFn = this.waitList.shift();
                                this.runningList.push(nextFn);
                                this.operationalFn(nextFn);
                            }
                            if (this.runningIndex === this.cacheList.length) {
                                this.finishEvent();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Queue.prototype.traverseRunningList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, record, error;
            return __generator(this, function (_a) {
                // 循环去遍历 runningList
                for (i = 0; i < this.maxConcurrency; i++) {
                    if (this.allowStart.includes(this.status)) {
                        break;
                    }
                    record = this.runningList[i];
                    if (!record) {
                        break;
                    }
                    // 如果是 undefined 抛出错误
                    if (this.runningIndex < this.cacheList.length) {
                        if (isNullOrUndefined(record.fn)) {
                            error = new Error("".concat(record.fn, " is undefined, the subscript is ").concat(this.runningIndex));
                            throw error;
                        }
                        this.operationalFn(record);
                    }
                }
                return [2 /*return*/];
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
    Queue.prototype.finishEvent = function () {
        this.status = 'finish';
        this.runningIndex = 0;
        this.waitList = [];
        this.cacheList = [];
        this.runOnEvent('finish', this.resultList);
    };
    return Queue;
}());
export default Queue;
