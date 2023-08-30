import SqlDatabase from 'tauri-plugin-sql-api';
import Model from './model';
import type { DatabaseType, ModelAttributes, ModelDefineOptions } from './type';
export type DatabasePath = `${'sqlite' | 'mysql' | 'postgres'}:${string}`;
/**
 * #### SQL ORM
 *
 * The path is relative to `tauri::api::path::BaseDirectory::App`
 *
 * and must start with `sqlite:` or `mysql:` or `postgres:`
 *
 * @class SqlORM
 * @example
 *
 * ``` ts
 * const sqlite = new SqlORM('sqlite:test.db');
 * const mysql = new SqlORM('mysql://root:root@localhost/database');
 * const postgres = new SqlORM('postgres://postgres:root@localhost:5432/postgres');
 * ```
 */
export default class SqlORM {
    /** database instance */
    private db;
    /** database path */
    private path;
    private databaseType;
    constructor(path: DatabasePath);
    private get getDB();
    /**
     * #### Define a model
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
    define(modelName: string, attributes?: ModelAttributes, options?: ModelDefineOptions): Promise<{
        new (): {};
        db: SqlDatabase;
        rawAttributes: Record<string, any>;
        rawOptions: import("./type").ModelOptions;
        modelName: string;
        _modelPrimaryKey?: string | null | undefined;
        databaseType: DatabaseType;
        readonly getDB: SqlDatabase;
        readonly _getRawAttributes: Record<string, any>;
        readonly _getRawOptions: import("./type").ModelOptions;
        readonly _getTimezoneDate: string;
        /**
         * #### Define a model
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
        _init(modelName: string, attributes: ModelAttributes, options: ModelDefineOptions): typeof Model;
        _setRawOptions(options: ModelDefineOptions): Promise<void>;
        _setTimestampsAttributes(attributes: ModelAttributes): Promise<void>;
        sync(options?: {
            force?: boolean | undefined;
        } | undefined): Promise<{
            result: import("tauri-plugin-sql-api").QueryResult;
            modelName: string;
        }>;
        create(data: Record<string, any>): Promise<import("tauri-plugin-sql-api").QueryResult>;
        bulkCreate(data: Record<string, any>[]): Promise<import("tauri-plugin-sql-api").QueryResult>;
        update(data: Record<string, any>, options?: import("./type").FindOptionsWhere | undefined): Promise<import("tauri-plugin-sql-api").QueryResult>;
        findOne(options?: import("./type").FindOptionsWhere | undefined): Promise<any>;
        findAll(options?: import("./type").FindAllOptions | undefined): Promise<unknown>;
        destroy(options?: import("./type").DestroyOptions | undefined): Promise<import("tauri-plugin-sql-api").QueryResult>;
        restore(options: import("./type").FindOptionsWhere): Promise<import("tauri-plugin-sql-api").QueryResult>;
        drop(): Promise<import("tauri-plugin-sql-api").QueryResult>;
    }>;
    /** Connect to the database */
    connect(callback?: () => void): Promise<void>;
    /** Close the database */
    close(): Promise<void>;
}
