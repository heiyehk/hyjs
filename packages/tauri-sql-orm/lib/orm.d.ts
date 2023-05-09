import SqlDatabase from 'tauri-plugin-sql-api';
import Model, { DatabaseType, ModelOptions } from './model';
export declare type DatabasePath = `${'sqlite' | 'mysql' | 'postgres'}:${string}`;
export default class SqlORM {
    /** 数据库实例 */
    private db;
    /** 数据库路径 */
    private path;
    private databaseType;
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
    constructor(path: DatabasePath);
    private get getDB();
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
    define(modelName: string, attributes?: Record<string, any>, options?: Record<string, any> & ModelOptions): Promise<{
        new (): {
            [x: string]: any;
        };
        db: SqlDatabase;
        rawAttributes: Record<string, any>;
        modelName: string;
        databaseType: DatabaseType;
        rawOptions: Record<string, any> & ModelOptions;
        readonly getDB: SqlDatabase;
        readonly getRawAttributes: Record<string, any>;
        readonly getDBPath: string;
        init(modelName: string, attributes?: Record<string, any>, options?: Record<string, any> & ModelOptions): Promise<typeof Model>;
        sync(options?: {
            force?: boolean | undefined;
        } | undefined): Promise<{
            result: import("tauri-plugin-sql-api").QueryResult;
            modelName: string;
        }>;
        create(data: Record<string, any>): Promise<import("tauri-plugin-sql-api").QueryResult>;
        bulkCreate(data: Record<string, any>[]): Promise<import("tauri-plugin-sql-api").QueryResult>;
        update(attributes: Record<string, any>, options: Record<string, any>): Promise<import("tauri-plugin-sql-api").QueryResult>;
        destroy(options: Record<string, any>): Promise<import("tauri-plugin-sql-api").QueryResult>;
        findOne(options: Record<string, any>): Promise<unknown>;
        findAll(options?: import("./model").FindOptions): Promise<unknown>;
        execute(sql: string, value?: any[] | undefined): Promise<import("tauri-plugin-sql-api").QueryResult | undefined>;
        select(sql: string, value?: any[] | undefined): Promise<unknown>;
        drop(): Promise<import("tauri-plugin-sql-api").QueryResult>;
    }>;
    connect(callback?: () => void): Promise<void>;
    /**
     * ### Close the database
     * @example
     * ``` ts
     * test.close();
     * ```
     */
    close(): Promise<void>;
}
