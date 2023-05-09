import SqlDatabase from 'tauri-plugin-sql-api';
export declare type DatabaseType = 'sqlite' | 'mysql' | 'postgres';
export interface ModelOptions {
    createdAt?: boolean | string;
    updatedAt?: boolean | string;
    deletedAt?: boolean | string;
    timestamps?: boolean;
    initialAutoIncrement?: number;
}
export interface FindOptions {
    where?: Record<string, any>;
    limit?: number;
    offset?: number;
    order?: [string, 'ASC' | 'DESC' | 'asc' | 'desc'];
}
export declare const getKeysAndValues: (obj: Record<string, any>, options: Model['rawOptions']) => {
    keys: string[];
    values: any[];
};
export default class Model {
    [x: string]: any;
    static db: SqlDatabase;
    static rawAttributes: Record<string, any>;
    static modelName: string;
    static databaseType: DatabaseType;
    static rawOptions: Record<string, any> & ModelOptions;
    static get getDB(): SqlDatabase;
    static get getRawAttributes(): Record<string, any>;
    static get getDBPath(): string;
    /**
     * init model
     * @param modelName
     * @param attributes
     * @param options
     * @returns
     */
    static init(modelName: string, attributes?: Record<string, any>, options?: Record<string, any> & ModelOptions): Promise<typeof Model>;
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
    static update(attributes: Record<string, any>, options: Record<string, any>): Promise<import("tauri-plugin-sql-api").QueryResult>;
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
    static destroy(options: Record<string, any>): Promise<import("tauri-plugin-sql-api").QueryResult>;
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
    static findOne(options: Record<string, any>): Promise<unknown>;
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
    static findAll(options?: FindOptions): Promise<unknown>;
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
    static execute(sql: string, value?: any[]): Promise<import("tauri-plugin-sql-api").QueryResult | undefined>;
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
    static select(sql: string, value?: any[]): Promise<unknown>;
    /**
     * drop table
     * @returns
     */
    static drop(): Promise<import("tauri-plugin-sql-api").QueryResult>;
}
