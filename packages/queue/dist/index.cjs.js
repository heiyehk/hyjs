'use strict';

/**
 * 类型获取
 * @param access 参数
 */
var getAccessType = function (access) {
    return Object.prototype.toString.call(access).slice(8, -1);
};
var isNullOrUndefined = function (access) { return access === null || access === undefined; };
var isError = function (access) { return getAccessType(access) === 'Error'; };

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
 * Queue
 * @param waitList witeList
 * @param maxConcurrency max concurrency, default 6
 * @param retryCount error retry count, default 0
 *
 * @example
 * ``` ts
 * const queue = new Queue({
 *   waitList: [fn1, fn2, fn3],
 *   maxConcurrency: 1,
 *   retryCount: 3
 * });
 * ```
 */
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
        this.allowStart = ['stop', 'pause', 'error'];
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
    /**
     * listener event
     * Will be called when the event is triggered, and the event will be passed into the parameter list of the listener
     * @param event event name `success` | `start` | `stop` | `pause` | `resume` | `running` | `finish` | `error`
     * @param listener
     */
    Queue.prototype.on = function (event, listener) {
        if (!this.events[event]) {
            this.events[event] = [listener];
        }
        else {
            this.events[event].push(listener);
        }
    };
    /**
     * start execution queue
     */
    Queue.prototype.start = function () {
        if (this.notAllowStart.includes(this.status)) {
            throw new Error("The current status is ".concat(this.status, ", start is not allowed"));
        }
        this.status = 'start';
        this.runOnEvent(this.status);
        this.run();
    };
    /**
     * stop queue
     * @param finish Whether to execute the finish event
     * @default false
     */
    Queue.prototype.stop = function (finish) {
        if (finish === void 0) { finish = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.status = 'stop';
                this.runOnEvent(this.status);
                if (finish) {
                    this.finishEvent();
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * pause queue
     */
    Queue.prototype.pause = function () {
        this.status = 'pause';
        this.runOnEvent(this.status);
    };
    /**
     * resume queue
     */
    Queue.prototype.resume = function () {
        this.status = 'resume';
        this.runOnEvent(this.status);
        this.traverseRunningList();
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
     * Delete a task from the queue
     * @param fn If it is a function,
     * it will judge whether it is the same function according to the toString method of the function,
     * otherwise,
     * the last task in the waitList will be automatically deleted
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
        if (this.allowStart.includes(this.status)) {
            return;
        }
        this.status = 'running';
        this.traverseRunningList();
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
                        this.runOnEvent('running', record._id);
                        // error retry
                        if (isError(fnResult) &&
                            this.retryCount &&
                            (!record._retryCount || record._retryCount < this.retryCount)) {
                            this.runOnEvent('error', fnResult, record._id);
                            record._retryCount = record._retryCount ? record._retryCount + 1 : 1;
                            this.operationalFn(record);
                        }
                        else {
                            if (!record._remove) {
                                this.runOnEvent('success', fnResult, record._id);
                            }
                            // After the current task is executed, the result will be stored in the result set.
                            // Even if the task is deleted, it must be saved. Enter the result set
                            this.resultList[record._id] = fnResult;
                            this.runningIndex++;
                            // After the current task is executed, delete it from the runningList
                            this.runningList.splice(this.runningList.findIndex(function (item) { return item._id === record._id; }), 1);
                            if (record._remove) {
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
        for (var i = 0; i < this.maxConcurrency; i++) {
            if (this.allowStart.includes(this.status)) {
                break;
            }
            var record = this.runningList[i];
            if (!record) {
                break;
            }
            // If it is undefined throw an error
            if (this.runningIndex < this.cacheList.length) {
                if (isNullOrUndefined(record.fn)) {
                    var error = new Error("".concat(record.fn, " is undefined, the subscript is ").concat(this.runningIndex));
                    this.runOnEvent('error', error, record._id);
                    throw error;
                }
                this.operationalFn(record);
            }
        }
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

module.exports = Queue;
