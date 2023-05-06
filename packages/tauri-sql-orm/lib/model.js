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
var Model = /** @class */ (function () {
    function Model() {
    }
    Object.defineProperty(Model, "getDB", {
        get: function () {
            return this.db;
        },
        enumerable: false,
        configurable: true
    });
    Model.init = function (modelName, attributes, options) {
        if (attributes === void 0) { attributes = {}; }
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.db = options.db;
                this.modelName = modelName;
                this.rawAttributes = attributes;
                return [2 /*return*/, this];
            });
        });
    };
    Model.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var keys, values, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = Object.keys(data);
                        values = Object.values(data);
                        return [4 /*yield*/, this.getDB.execute("INSERT INTO ".concat(this.modelName, " (").concat(keys.join(', '), ") VALUES (").concat(values.join(', '), ");"))];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Model.bulkCreate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var keys, placeholders, values, placeholdersArr, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        keys = Object.keys(data[0]);
                        placeholders = Array(keys.length).fill('?').join(', ');
                        values = data.map(function (record) { return Object.values(record); }).flat();
                        placeholdersArr = Array(data.length).fill("(".concat(placeholders, ")")).join(', ');
                        return [4 /*yield*/, (_a = this.getDB).execute.apply(_a, __spreadArray(["INSERT INTO ".concat(this.modelName, " (").concat(keys.join(', '), ") VALUES ").concat(placeholdersArr)], __read(values), false))];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Model.findOne = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var keys, values, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = Object.keys(options);
                        values = Object.values(options);
                        return [4 /*yield*/, this.getDB.select("SELECT * FROM ".concat(this.modelName, " WHERE ").concat(keys.map(function (key) { return "".concat(key, " = ?"); }).join(' AND '), " LIMIT 1"), values)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Model.findAll = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var keys, values, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        keys = Object.keys(options);
                        values = Object.values(options);
                        return [4 /*yield*/, (_a = this.getDB).select.apply(_a, __spreadArray(["SELECT * FROM ".concat(this.modelName, " ").concat(keys.length ? "WHERE ".concat(keys.map(function (key) { return "".concat(key, " = ?"); }).join(' AND ')) : '')], __read(values), false))];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Model.sync = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var keys, sqlValue, sql, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(options && options.force)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.drop()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        keys = Object.keys(this.rawAttributes);
                        sqlValue = keys.map(function (item) {
                            var addSql = "".concat(item, " ").concat(_this.rawAttributes[item].type);
                            if (_this.rawAttributes[item].allowNull === false) {
                                addSql += ' NOT NULL';
                            }
                            if (_this.rawAttributes[item].primaryKey) {
                                addSql += ' PRIMARY KEY';
                            }
                            if (_this.rawAttributes[item].autoIncrement) {
                                addSql += ' AUTOINCREMENT';
                            }
                            return addSql;
                        });
                        sql = "CREATE TABLE IF NOT EXISTS ".concat(this.modelName, " (\r\n      ").concat(sqlValue.join(', \r\n      '), "\r\n)");
                        return [4 /*yield*/, this.getDB.execute(sql)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, {
                                result: result,
                                modelName: this.modelName
                            }];
                }
            });
        });
    };
    Model.drop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDB.execute("DROP TABLE IF EXISTS ".concat(this.modelName))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Model;
}());
export default Model;
