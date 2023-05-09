import SqlDatabase from 'tauri-plugin-sql-api';

var DataTypes = /** @class */ (function () {
    function DataTypes() {
    }
    DataTypes.TEXT = 'TEXT';
    DataTypes.INTEGER = 'INTEGER';
    DataTypes.REAL = 'REAL';
    DataTypes.BLOB = 'BLOB';
    DataTypes.NULL = 'NULL';
    DataTypes.BOOLEAN = 'BOOLEAN';
    DataTypes.DATE = 'DATE';
    DataTypes.DATEONLY = 'DATEONLY';
    DataTypes.TIME = 'TIME';
    DataTypes.NOW = 'NOW';
    DataTypes.UUID = 'UUID';
    return DataTypes;
}());

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
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
var autoIncrement = {
    sqlite: 'AUTOINCREMENT',
    mysql: 'AUTO_INCREMENT',
    postgres: 'SERIAL'
};
var getKeysAndValues = function (obj, options) {
    var keys = Object.keys(obj);
    var values = Object.values(obj);
    if (options.timestamps) {
        if (options.createdAt) {
            var createdAtKey = typeof options.createdAt === 'string' ? options.createdAt : 'createdAt';
            keys.push(createdAtKey);
            values.push(new Date().toISOString());
        }
        if (options.updatedAt) {
            var updatedAtKey = typeof options.updatedAt === 'string' ? options.updatedAt : 'updatedAt';
            keys.push(updatedAtKey);
            values.push(new Date().toISOString());
        }
        if (options.deletedAt) {
            var deletedAtKey = typeof options.deletedAt === 'string' ? options.deletedAt : 'deletedAt';
            keys.push(deletedAtKey);
            values.push(null);
        }
    }
    return { keys: keys, values: values };
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
    Object.defineProperty(Model, "getRawAttributes", {
        get: function () {
            return this.rawAttributes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model, "getDBPath", {
        get: function () {
            return this.db.path;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * init model
     * @param modelName
     * @param attributes
     * @param options
     * @returns
     */
    Model.init = function (modelName, attributes, options) {
        if (attributes === void 0) { attributes = {}; }
        if (options === void 0) { options = {}; }
        return __awaiter$1(this, void 0, void 0, function () {
            var _a;
            return __generator$1(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, options.db];
                    case 1:
                        _a.db = _b.sent();
                        this.modelName = modelName;
                        this.rawAttributes = attributes;
                        this.databaseType = options.databaseType;
                        this.rawOptions = options;
                        return [2 /*return*/, this];
                }
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
        return __awaiter$1(this, void 0, void 0, function () {
            var keys, createdAtKey, updatedAtKey, deletedAtKey, sqlValue, sql, result;
            var _this = this;
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.getRawAttributes)
                            throw new Error('Model not initialized, attributes is undefined.');
                        if (!(options && options.force)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.drop()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        keys = Object.keys(this.getRawAttributes);
                        if (this.rawOptions.timestamps) {
                            if (this.rawOptions.createdAt) {
                                createdAtKey = typeof this.rawOptions.createdAt === 'string' ? this.rawOptions.createdAt : 'createdAt';
                                this.getRawAttributes[createdAtKey] = {
                                    type: 'DATE',
                                    allowNull: false
                                };
                                keys.push(createdAtKey);
                            }
                            if (this.rawOptions.updatedAt) {
                                updatedAtKey = typeof this.rawOptions.updatedAt === 'string' ? this.rawOptions.updatedAt : 'updatedAt';
                                this.getRawAttributes[updatedAtKey] = {
                                    type: 'DATE',
                                    allowNull: false
                                };
                                keys.push(updatedAtKey);
                            }
                            if (this.rawOptions.deletedAt) {
                                deletedAtKey = typeof this.rawOptions.deletedAt === 'string' ? this.rawOptions.deletedAt : 'deletedAt';
                                this.getRawAttributes[deletedAtKey] = {
                                    type: 'DATE'
                                };
                                keys.push(deletedAtKey);
                            }
                        }
                        sqlValue = keys.map(function (item) {
                            var addSql = "".concat(item, " ").concat(_this.getRawAttributes[item].type);
                            if (_this.getRawAttributes[item].allowNull === false) {
                                addSql += ' NOT NULL';
                            }
                            if (_this.getRawAttributes[item].primaryKey) {
                                addSql += ' PRIMARY KEY';
                            }
                            if (_this.getRawAttributes[item].autoIncrement) {
                                addSql += " ".concat(autoIncrement[_this.databaseType]);
                            }
                            return addSql;
                        });
                        sql = "CREATE TABLE IF NOT EXISTS ".concat(this.modelName, " (\r\n      ").concat(sqlValue.join(', \r\n      '), "\r\n)");
                        return [4 /*yield*/, this.getDB.execute(sql)];
                    case 3:
                        result = _a.sent();
                        if (!(this.rawOptions.initialAutoIncrement && this.rawOptions.initialAutoIncrement > 0)) return [3 /*break*/, 7];
                        if (!(this.databaseType === 'sqlite')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getDB.execute("UPDATE SQLITE_SEQUENCE SET seq = ".concat(this.rawOptions.initialAutoIncrement, " WHERE name = '").concat(this.modelName, "';"))];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.getDB.execute("ALTER TABLE ".concat(this.modelName, " AUTO_INCREMENT = ").concat(this.rawOptions.initialAutoIncrement, ";"))];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, {
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
        return __awaiter$1(this, void 0, void 0, function () {
            var _a, keys, values, placeholders, result;
            return __generator$1(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = getKeysAndValues(data, this.rawOptions), keys = _a.keys, values = _a.values;
                        placeholders = Array(keys.length).fill('?').join(', ');
                        return [4 /*yield*/, this.getDB.execute("INSERT INTO ".concat(this.modelName, " (").concat(keys.join(', '), ") VALUES (").concat(placeholders, ");"), values)];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, result];
                }
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
        return __awaiter$1(this, void 0, void 0, function () {
            var keys, placeholders, values, placeholdersArr, result;
            var _this = this;
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = getKeysAndValues(data[0], this.rawOptions).keys;
                        placeholders = Array(keys.length).fill('?').join(', ');
                        values = data
                            .map(function (record) {
                            var values = getKeysAndValues(record, _this.rawOptions).values;
                            return values;
                        })
                            .flat();
                        placeholdersArr = Array(data.length).fill("(".concat(placeholders, ")")).join(', ');
                        return [4 /*yield*/, this.getDB
                                .execute("INSERT INTO ".concat(this.modelName, " (").concat(keys.join(', '), ") VALUES ").concat(placeholdersArr), values)
                                .catch(function (error) {
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
     * update data to table
     * @param attributes
     * @param options
     * @returns
     *
     * @example
     * ```ts
     * test.update({ name: 'test' }, { where: { id: 1 } });
     * ```
     */
    Model.update = function (attributes, options) {
        return __awaiter$1(this, void 0, void 0, function () {
            var keys, values, sql, result;
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = Object.keys(attributes);
                        values = Object.values(attributes);
                        sql = "UPDATE ".concat(this.modelName, " SET ");
                        if (this.databaseType === 'sqlite') {
                            sql += "".concat(keys.map(function (key) { return "".concat(key, " = ?"); }).join(', '), " WHERE id = ").concat(options.where.id);
                        }
                        else if (this.databaseType === 'mysql') {
                            sql += "SET ".concat(keys.map(function (key) { return "`".concat(key, "` = ?"); }).join(', '), " WHERE `id` = ").concat(options.where.id);
                        }
                        else if (this.databaseType === 'postgres') {
                            sql += "SET ".concat(keys.map(function (key) { return "\"".concat(key, "\" = ?"); }).join(', '), " WHERE \"id\" = ").concat(options.where.id);
                        }
                        return [4 /*yield*/, this.getDB.execute(sql, values)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * destroy data to table
     * @param options
     * @returns
     *
     * @example
     * ```ts
     * test.destroy({ where: { id: 1 } });
     * ```
     */
    Model.destroy = function (options) {
        return __awaiter$1(this, void 0, void 0, function () {
            var keys, values, result;
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = Object.keys(options);
                        values = Object.values(options);
                        return [4 /*yield*/, this.getDB.execute("DELETE FROM ".concat(this.modelName, " WHERE ").concat(keys.map(function (key) { return "".concat(key, " = ?"); }).join(' AND '), " LIMIT 1"), values)];
                    case 1:
                        result = _a.sent();
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
        return __awaiter$1(this, void 0, void 0, function () {
            var keys, values, result;
            return __generator$1(this, function (_a) {
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
    /**
     * find all data to table
     * @param options
     * @returns
     *
     * @example
     * ```ts
     * test.findAll({
     *  where: { id: 1 },
     *  limit: 10,
     *  offset: 0,
     *  order: ['id', 'DESC']
     * });
     * ```
     */
    Model.findAll = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter$1(this, void 0, void 0, function () {
            var _a, where, _b, limit, _c, offset, _d, order, keys, values, sql, result;
            return __generator$1(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = options.where, where = _a === void 0 ? {} : _a, _b = options.limit, limit = _b === void 0 ? 0 : _b, _c = options.offset, offset = _c === void 0 ? 0 : _c, _d = options.order, order = _d === void 0 ? [] : _d;
                        keys = Object.keys(where);
                        values = Object.values(where);
                        sql = "SELECT * FROM ".concat(this.modelName);
                        if (keys.length) {
                            sql += " WHERE ".concat(keys.map(function (key) { return "".concat(key, " = ?"); }).join(' AND '));
                        }
                        if (order && order.length) {
                            sql += " ORDER BY ".concat(order[0], " ").concat(order[1]);
                        }
                        if (limit) {
                            sql += " LIMIT ".concat(limit);
                        }
                        if (offset) {
                            sql += " OFFSET ".concat(offset);
                        }
                        return [4 /*yield*/, this.getDB.select(sql, values).catch(function (error) {
                                throw new Error(error);
                            })];
                    case 1:
                        result = _e.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * execute sql
     * @param sql
     * @param value
     * @returns
     *
     * @example
     * ```ts
     * test.execute('SELECT * FROM test');
     * ```
     */
    Model.execute = function (sql, value) {
        return __awaiter$1(this, void 0, void 0, function () {
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!value) {
                            return [2 /*return*/, this.getDB.execute(sql)];
                        }
                        return [4 /*yield*/, this.getDB.execute(sql, value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * select sql
     * @param sql
     * @param value
     * @returns
     *
     * @example
     * ```ts
     * test.select('SELECT * FROM test');
     * ```
     */
    Model.select = function (sql, value) {
        return __awaiter$1(this, void 0, void 0, function () {
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!value) {
                            return [2 /*return*/, this.getDB.select(sql)];
                        }
                        return [4 /*yield*/, this.getDB.select(sql, value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * drop table
     * @returns
     */
    Model.drop = function () {
        return __awaiter$1(this, void 0, void 0, function () {
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDB.execute("DROP TABLE IF EXISTS ".concat(this.modelName))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Model;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var SqlORM = /** @class */ (function () {
    /**
     * ### SQL ORM
     *
     * The path is relative to `tauri::api::path::BaseDirectory::App`
     *
     * and must start with `sqlite:` or `mysql:` or `postgres:`
     *
     * @class SqlORM
     * @example const test = new SqlORM('sqlite:test.db');
     */
    function SqlORM(path) {
        /** 数据库实例 */
        this.db = null;
        /** 数据库路径 */
        this.path = '';
        this.databaseType = '';
        this.path = path;
        this.databaseType = path.split(':')[0];
        this.connect();
    }
    Object.defineProperty(SqlORM.prototype, "getDB", {
        get: function () {
            return this.db;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * ### Define a model
     * @param modelName
     * @param attributes
     * @param options
     * @example
     * ``` ts
     * const Test = test.define('test', {
     *   id: {
     *     type: DataTypes.INTEGER,
     *     primaryKey: true,
     *     autoIncrement: true
     *   },
     *   name: {
     *     type: DataTypes.TEXT,
     *     allowNull: false
     *   }
     * });
     * ```
     * @returns
     */
    SqlORM.prototype.define = function (modelName, attributes, options) {
        if (attributes === void 0) { attributes = {}; }
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, model;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options.modelName = modelName;
                        _a = options;
                        return [4 /*yield*/, this.getDB];
                    case 1:
                        _a.db = _b.sent();
                        options.databaseType = this.databaseType;
                        model = /** @class */ (function (_super) {
                            __extends(model, _super);
                            function model() {
                                return _super !== null && _super.apply(this, arguments) || this;
                            }
                            return model;
                        }(Model));
                        model.init(modelName, attributes, options);
                        return [2 /*return*/, model];
                }
            });
        });
    };
    SqlORM.prototype.connect = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.path)
                            throw new Error('Database path is not defined.');
                        this.db = SqlDatabase.load(this.path).catch(function (error) {
                            throw new Error(error);
                        });
                        return [4 /*yield*/, this.getDB];
                    case 1:
                        _a.sent();
                        if (callback && typeof callback === 'function')
                            callback();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * ### Close the database
     * @example
     * ``` ts
     * test.close();
     * ```
     */
    SqlORM.prototype.close = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.db];
                    case 1:
                        (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.close();
                        this.db = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    return SqlORM;
}());

export { DataTypes, SqlORM as default };
