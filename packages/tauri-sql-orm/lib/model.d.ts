import SqlDatabase from 'tauri-plugin-sql-api';
export interface ModelOptions {
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    timestamps?: boolean;
}
export default class Model {
    [x: string]: any;
    static db: SqlDatabase;
    static rawAttributes: Record<string, any>;
    static modelName: string;
    static get getDB(): SqlDatabase;
    static init(modelName: string, attributes?: Record<string, any>, options?: Record<string, any>): Promise<typeof Model>;
    static create(data: Record<string, any>): Promise<import("tauri-plugin-sql-api").QueryResult>;
    static bulkCreate(data: Record<string, any>[]): Promise<import("tauri-plugin-sql-api").QueryResult>;
    static findOne(options: Record<string, any>): Promise<unknown>;
    static findAll(options?: Record<string, any>): Promise<unknown>;
    static sync(options?: {
        force?: boolean;
    }): Promise<{
        result: import("tauri-plugin-sql-api").QueryResult;
        modelName: string;
    }>;
    static drop(): Promise<void>;
}
