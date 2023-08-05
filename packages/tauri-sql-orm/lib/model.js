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
var __values = (this && this.__values) || function(o) {
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
import { getLocalTime } from './utils';
/** database auto increment */
var autoIncrement = {
    sqlite: 'AUTOINCREMENT',
    mysql: 'AUTO_INCREMENT',
    postgres: 'SERIAL'
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
    Object.defineProperty(Model, "_getRawAttributes", {
        get: function () {
            return this.rawAttributes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model, "_getRawOptions", {
        get: function () {
            return this.rawOptions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model, "_getTimezoneDate", {
        get: function () {
            return getLocalTime(this._getRawOptions.timezone);
        },
        enumerable: false,
        configurable: true
    });
    Model._init = function (modelName, attributes, options) {
        this._modelPrimaryKey = findPrimaryKey(attributes);
        this.db = options.db;
        this.modelName = modelName;
        this._setRawOptions(options);
        this._setTimestampsAttributes(attributes);
        return this;
    };
    Model._setRawOptions = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var rawOptions;
            return __generator(this, function (_a) {
                rawOptions = __assign({}, options);
                if (rawOptions.timestamps) {
                    if (rawOptions.createdAt === false) {
                        rawOptions.createdAt = false;
                    }
                    else {
                        rawOptions.createdAt =
                            rawOptions.createdAt === undefined ? 'createdAt' : rawOptions.createdAt;
                    }
                    if (rawOptions.updatedAt === false) {
                        rawOptions.updatedAt = false;
                    }
                    else {
                        rawOptions.updatedAt =
                            rawOptions.updatedAt === undefined ? 'updatedAt' : rawOptions.updatedAt;
                    }
                    if (rawOptions.deletedAt === false) {
                        rawOptions.deletedAt = false;
                    }
                    else {
                        rawOptions.deletedAt =
                            rawOptions.deletedAt === undefined ? 'deletedAt' : rawOptions.deletedAt;
                    }
                }
                else {
                    rawOptions.createdAt = false;
                    rawOptions.updatedAt = false;
                    rawOptions.deletedAt = false;
                }
                this.rawOptions = rawOptions;
                this.databaseType = rawOptions.databaseType;
                return [2 /*return*/];
            });
        });
    };
    Model._setTimestampsAttributes = function (attributes) {
        return __awaiter(this, void 0, void 0, function () {
            var rawAttributes, timestampsAttr, _a, _b, key;
            var e_1, _c;
            return __generator(this, function (_d) {
                rawAttributes = __assign({}, attributes);
                timestampsAttr = accessTimestamps(this._getRawOptions);
                if (Object.keys.length) {
                    try {
                        for (_a = __values(Object.keys(timestampsAttr)), _b = _a.next(); !_b.done; _b = _a.next()) {
                            key = _b.value;
                            rawAttributes[timestampsAttr[key].key] = timestampsAttr[key].properties;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                this.rawAttributes = rawAttributes;
                return [2 /*return*/];
            });
        });
    };
    /**
     * sync table
     *
     * @param options
     * @returns
     *
     * @example
     * ```ts
     * test.sync();
     * ```
     *
     * `force: true` will drop table if exists
     * @example
     * ```ts
     * test.sync({ force: true });
     * ```
     */
    Model.sync = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var keys, sqlValue, sql, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._getRawAttributes)
                            throw new Error('Model not initialized, attributes is undefined.');
                        if (!(options && options.force)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.drop()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        keys = Object.keys(this._getRawAttributes);
                        sqlValue = keys.map(function (item) {
                            var addSql = "".concat(item, " ").concat(_this._getRawAttributes[item].type);
                            if (_this._getRawAttributes[item].allowNull === false) {
                                addSql += ' NOT NULL';
                            }
                            if (_this._getRawAttributes[item].primaryKey) {
                                addSql += ' PRIMARY KEY';
                            }
                            if (_this._getRawAttributes[item].autoIncrement) {
                                addSql += " ".concat(autoIncrement[_this.databaseType]);
                            }
                            if (_this._getRawAttributes[item].unique) {
                                addSql += ' UNIQUE';
                            }
                            if (_this._getRawAttributes[item].comment) {
                                if (_this.databaseType === 'mysql') {
                                    addSql += " COMMENT '".concat(_this._getRawAttributes[item].comment, "'");
                                    // TODO: sqlite, postgres
                                    // } else if (this.databaseType === 'sqlite') {
                                    //   addSql += ` -- ${this._getRawAttributes[item].comment}`;
                                    // } else if (this.databaseType === 'postgres') {
                                    //   addSql += ` -- ${this._getRawAttributes[item].comment}`;
                                }
                            }
                            return addSql;
                        });
                        sql = "CREATE TABLE IF NOT EXISTS ".concat(this.modelName, " (\r\n      ").concat(sqlValue.join(', \r\n      '), "\r\n)");
                        return [4 /*yield*/, this.getDB.execute(sql).catch(function (error) {
                                throw new Error(error);
                            })];
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
    /**
     * create data to table
     * @param data
     * @returns
     *
     * @example
     * ```ts
     * test.create({ name: 'test' });
     * ```
     */
    Model.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                if (!data)
                    throw new Error('Data is undefined.');
                result = this.bulkCreate([data]).catch(function (error) {
                    throw new Error(error);
                });
                return [2 /*return*/, result];
            });
        });
    };
    /**
     * bulk create data to table
     * @param data
     * @returns
     *
     * @example
     * ```ts
     * test.bulkCreate([{ name: 'test' }, { name: 'test2' }]);
     * ```
     */
    Model.bulkCreate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var keys, filteredKeys, values, placeholders, placeholdersArr, sql, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data)
                            throw new Error('Data is undefined.');
                        keys = Object.keys(this._getRawAttributes);
                        filteredKeys = keys.filter(function (item) { return !_this._getRawAttributes[item].autoIncrement; });
                        values = data
                            .map(function (record) {
                            var e_2, _a;
                            var createValue = [];
                            try {
                                for (var _b = __values(Object.keys(_this._getRawAttributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var key = _c.value;
                                    // add check for autoIncrement
                                    if (record[key] === undefined) {
                                        // if autoIncrement, skip
                                        if (_this._getRawAttributes[key].autoIncrement)
                                            continue;
                                        // if defaultValue not undefined, set default value
                                        // deletedAt will set to null
                                        if (_this._getRawAttributes[key].defaultValue !== undefined) {
                                            createValue.push(_this._getRawAttributes[key].defaultValue);
                                            record[key] = _this._getRawAttributes[key].defaultValue;
                                        }
                                        else if (_this._getRawAttributes[key].allowNull === false) {
                                            // if allowNull is false, throw error
                                            throw new Error("Column ".concat(key, " is not allow null."));
                                        }
                                        else {
                                            createValue.push(null);
                                            record[key] = null;
                                        }
                                    }
                                    else {
                                        createValue.push(record[key]);
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                            return createValue;
                        })
                            .flat();
                        placeholders = Array(filteredKeys.length).fill('?').join(', ');
                        placeholdersArr = Array(data.length).fill("(".concat(placeholders, ")")).join(', ');
                        sql = "INSERT INTO ".concat(this.modelName, " (").concat(filteredKeys.join(', '), ") VALUES ").concat(placeholdersArr);
                        return [4 /*yield*/, this.getDB.execute(sql, values).catch(function (error) {
                                throw new Error(error);
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Model.update = function (data, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, where, whereKeys, whereValues, whereSql, keys, values, sql, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!data)
                            throw new Error('Data is undefined.');
                        _a = (options || {}).where, where = _a === void 0 ? {} : _a;
                        whereKeys = Object.keys(where);
                        whereValues = Object.values(where);
                        whereSql = whereKeys.length
                            ? " WHERE ".concat(whereKeys.map(function (item) { return "".concat(item, " = ?"); }).join(' AND '))
                            : '';
                        if (this._getRawAttributes.updatedAt) {
                            data.updatedAt = this._getTimezoneDate;
                        }
                        keys = Object.keys(data);
                        values = Object.values(data);
                        sql = "UPDATE ".concat(this.modelName, " SET ").concat(keys
                            .map(function (item) { return "".concat(item, " = ?"); })
                            .join(', ')).concat(whereSql);
                        return [4 /*yield*/, this.getDB.execute(sql, __spreadArray(__spreadArray([], __read(values), false), __read(whereValues), false)).catch(function (error) {
                                throw new Error(error);
                            })];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * find one data to table
     * @param options
     * @returns
     *
     * @example
     * ```ts
     * test.findOne({ where: { id: 1 } });
     * ```
     */
    Model.findOne = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, where, whereKeys, whereValues, whereSql, paranoidSql, sql, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = (options || {}).where, where = _a === void 0 ? {} : _a;
                        whereKeys = Object.keys(where);
                        whereValues = Object.values(where);
                        whereSql = whereKeys.length
                            ? " WHERE ".concat(whereKeys.map(function (item) { return "".concat(item, " = ?"); }).join(' AND '))
                            : ' WHERE 1=1';
                        paranoidSql = this._getRawAttributes.deletedAt
                            ? " AND ".concat(this._getRawOptions.deletedAt, " IS NULL")
                            : '';
                        sql = "SELECT * FROM ".concat(this.modelName).concat(whereSql).concat(paranoidSql, " LIMIT 1");
                        return [4 /*yield*/, this.getDB.select(sql, whereValues).catch(function (error) {
                                throw new Error(error);
                            })];
                    case 1:
                        result = _b.sent();
                        if (result.length)
                            return [2 /*return*/, result[0]];
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * find all data to table
     * @param options
     * @returns
     *
     * @example
     * ```ts
     * test.findAll({
     *   where: {
     *     id: 1
     *   },
     *   limit: 10,
     *   offset: 0,
     *   order: ['id', 'DESC']
     * });
     * ```
     */
    Model.findAll = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, where, limit, offset, order, whereKeys, whereValues, paranoidSql, whereSql, orderSql, limitSql, offsetSql, sql, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = options || {}, _b = _a.where, where = _b === void 0 ? {} : _b, limit = _a.limit, offset = _a.offset, order = _a.order;
                        whereKeys = Object.keys(where);
                        whereValues = Object.values(where);
                        paranoidSql = '';
                        if ((options === null || options === void 0 ? void 0 : options.paranoid) === false || (options === null || options === void 0 ? void 0 : options.paranoid) === undefined) {
                            paranoidSql = this._getRawOptions.deletedAt
                                ? " AND ".concat(this._getRawOptions.deletedAt, " IS NULL")
                                : '';
                        }
                        whereSql = whereKeys.length
                            ? " WHERE ".concat(whereKeys.map(function (item) { return "".concat(item, " = ?"); }).join(' AND '))
                            : ' WHERE 1=1';
                        orderSql = order ? " ORDER BY ".concat(order) : '';
                        limitSql = limit ? " LIMIT ".concat(limit) : '';
                        offsetSql = offset ? " OFFSET ".concat(offset) : '';
                        sql = "SELECT * FROM ".concat(this.modelName).concat(whereSql).concat(paranoidSql).concat(orderSql).concat(limitSql).concat(offsetSql);
                        return [4 /*yield*/, this.getDB.select(sql, whereValues).catch(function (error) {
                                throw new Error(error);
                            })];
                    case 1:
                        result = _c.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * if model has deletedAt, will update deletedAt
     * if model not has deletedAt or force is true, will delete data
     * @param options
     * @returns
     *
     * @example
     * ```ts
     * test.destroy({ where: { id: 1 } });
     * ```
     */
    Model.destroy = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, where, whereKeys, whereValues, whereSql, sql, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = (options || {}).where, where = _a === void 0 ? {} : _a;
                        whereKeys = Object.keys(where);
                        whereValues = Object.values(where);
                        whereSql = whereKeys.length
                            ? " WHERE ".concat(whereKeys.map(function (item) { return "".concat(item, " = ?"); }).join(' AND '))
                            : '';
                        sql = '';
                        if ((options === null || options === void 0 ? void 0 : options.force) || !this._getRawOptions.deletedAt) {
                            sql = "DELETE FROM ".concat(this.modelName).concat(whereSql);
                        }
                        else if (this._getRawOptions.deletedAt) {
                            sql = "UPDATE ".concat(this.modelName, " SET ").concat(this._getRawOptions.deletedAt, " = '").concat(this._getTimezoneDate, "'").concat(whereSql);
                        }
                        return [4 /*yield*/, this.getDB.execute(sql, whereValues).catch(function (error) {
                                throw new Error(error);
                            })];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /** if model has deletedAt, will restore data */
    Model.restore = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var keys, values, sql, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options || !options.where) {
                            throw new Error('options.where is required');
                        }
                        keys = Object.keys(options.where);
                        values = Object.values(options.where);
                        // if model not has deletedAt, throw error
                        if (!this._getRawOptions.deletedAt) {
                            throw new Error("".concat(this.modelName, " not has deletedAt"));
                        }
                        sql = "UPDATE ".concat(this.modelName, " SET ").concat(this._getRawOptions.deletedAt, " = NULL, ").concat(this._getRawOptions.updatedAt, " = '").concat(this._getTimezoneDate, "' WHERE ").concat(keys.map(function (key) { return "".concat(key, " = ?"); }).join(' AND '));
                        return [4 /*yield*/, this.getDB.execute(sql, values).catch(function (error) {
                                throw new Error(error);
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * drop table
     * @returns
     */
    Model.drop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDB.execute("DROP TABLE IF EXISTS ".concat(this.modelName)).catch(function (error) {
                            throw new Error(error);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Model._modelPrimaryKey = null;
    return Model;
}());
export default Model;
/** find primary key */
function findPrimaryKey(attributes) {
    var e_3, _a;
    if (!attributes)
        throw new Error('attributes is required');
    var keys = Object.keys(attributes);
    try {
        for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
            var key = keys_1_1.value;
            if (attributes[key].primaryKey)
                return key;
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
}
/** get timestamp properties */
function accessTimestamps(options) {
    var e_4, _a;
    var timestampsProperties = {};
    if (options.timestamps) {
        var timestampKeys = ['createdAt', 'updatedAt', 'deletedAt'];
        try {
            for (var timestampKeys_1 = __values(timestampKeys), timestampKeys_1_1 = timestampKeys_1.next(); !timestampKeys_1_1.done; timestampKeys_1_1 = timestampKeys_1.next()) {
                var key = timestampKeys_1_1.value;
                var timestampKey = typeof options[key] === 'string' ? options[key] : key;
                if (options[key] === false)
                    continue;
                timestampsProperties[key] = {
                    key: timestampKey,
                    type: 'DATE',
                    properties: {
                        type: 'DATE',
                        defaultValue: key === 'deletedAt' ? null : getLocalTime(options.timezone)
                    }
                };
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (timestampKeys_1_1 && !timestampKeys_1_1.done && (_a = timestampKeys_1.return)) _a.call(timestampKeys_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
    }
    return timestampsProperties;
}
