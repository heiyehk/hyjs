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
  private db: Promise<SqlDatabase> | null = null;

  /** database path */
  private path = '';

  private databaseType: DatabaseType;

  constructor(path: DatabasePath) {
    this.path = path;
    this.databaseType = path.split(':')[0] as 'sqlite' | 'mysql' | 'postgres';
    this.connect();
  }

  private get getDB() {
    return this.db;
  }

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
  public async define(
    modelName: string,
    attributes: ModelAttributes = {},
    options: ModelDefineOptions = {}
  ) {
    options.modelName = modelName;
    options.db = await this.getDB;
    options.databaseType = this.databaseType;

    // eslint-disable-next-line prettier/prettier
    const model = class extends Model { };
    model._init(modelName, attributes, options);

    return model;
  }

  /** Connect to the database */
  public async connect(callback?: () => void) {
    if (!this.path) throw new Error('Database path is not defined.');
    this.db = SqlDatabase.load(this.path).catch((error) => {
      throw new Error(error);
    });
    await this.getDB;
    if (callback && typeof callback === 'function') callback();
  }

  /** Close the database */
  public async close() {
    (await this.db)?.close();
    this.db = null;
  }
}
