import SqlDatabase from 'tauri-plugin-sql-api';
import Model from './model';
export default class SqlORM {
    /** 数据库实例 */
    db: Promise<SqlDatabase> | null;
    /** 数据库路径 */
    path: string;
    constructor(path: string);
    init(path: string): Promise<void>;
    getDB(): Promise<SqlDatabase>;
    parsingPath(path: string): Promise<string>;
    define(modelName: string, attributes?: Record<string, any>, options?: Record<string, any>): Promise<{
        new (): {
            [x: string]: any;
        };
        db: SqlDatabase;
        rawAttributes: Record<string, any>;
        modelName: string;
        readonly getDB: SqlDatabase;
        init(modelName: string, attributes?: Record<string, any>, options?: Record<string, any>): Promise<typeof Model>;
        create(data: Record<string, any>): Promise<import("tauri-plugin-sql-api").QueryResult>;
        bulkCreate(data: Record<string, any>[]): Promise<import("tauri-plugin-sql-api").QueryResult>;
        findOne(options: Record<string, any>): Promise<unknown>;
        findAll(options?: Record<string, any>): Promise<unknown>;
        sync(options?: {
            force?: boolean | undefined;
        } | undefined): Promise<{
            result: import("tauri-plugin-sql-api").QueryResult;
            modelName: string;
        }>;
        drop(): Promise<void>;
    }>;
    connect(callback?: () => void): Promise<void>;
    close(): Promise<void>;
}
