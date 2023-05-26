import SqlDatabase from 'tauri-plugin-sql-api';
import { DatabaseType, DestroyOptions, FindAllOptions, FindOptionsWhere, ModelAttributes, ModelDefineOptions, ModelOptions, RestoreOptions } from './type';
export default class Model {
    static db: SqlDatabase;
    static rawAttributes: Record<string, any>;
    static rawOptions: ModelOptions;
    static modelName: string;
    static _modelPrimaryKey?: string | null;
    static databaseType: DatabaseType;
    static get getDB(): SqlDatabase;
    static get _getRawAttributes(): Record<string, any>;
    static get _getRawOptions(): ModelOptions;
    static get _getTimezoneDate(): string;
    static _init(modelName: string, attributes: ModelAttributes, options: ModelDefineOptions): typeof Model;
    static _setRawOptions(options: ModelDefineOptions): Promise<void>;
    static _setTimestampsAttributes(attributes: ModelAttributes): Promise<void>;
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
    static sync(options?: {
        force?: boolean;
    }): Promise<{
        result: import("tauri-plugin-sql-api").QueryResult;
        modelName: string;
    }>;
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
    static create(data: Record<string, any>): Promise<import("tauri-plugin-sql-api").QueryResult>;
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
    static bulkCreate(data: Record<string, any>[]): Promise<import("tauri-plugin-sql-api").QueryResult>;
    static update(data: Record<string, any>, options?: FindOptionsWhere): Promise<import("tauri-plugin-sql-api").QueryResult>;
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
    static findOne(options?: FindOptionsWhere): Promise<any>;
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
    static findAll(options?: FindAllOptions): Promise<unknown>;
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
    static destroy(options?: DestroyOptions): Promise<import("tauri-plugin-sql-api").QueryResult>;
    /** if model has deletedAt, will restore data */
    static restore(options: RestoreOptions): Promise<import("tauri-plugin-sql-api").QueryResult>;
    /**
     * drop table
     * @returns
     */
    static drop(): Promise<import("tauri-plugin-sql-api").QueryResult>;
}
