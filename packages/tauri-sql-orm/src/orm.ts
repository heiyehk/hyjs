import SqlDatabase from 'tauri-plugin-sql-api';

import Model, { DatabaseType, ModelOptions } from './model';

export type DatabasePath = `${'sqlite' | 'mysql' | 'postgres'}:${string}`;

export default class SqlORM {
  /** 数据库实例 */
  private db: Promise<SqlDatabase> | null = null;

  /** 数据库路径 */
  private path = '';

  private databaseType: DatabaseType | '' = '';

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
  constructor(path: DatabasePath) {
    this.path = path;
    this.databaseType = path.split(':')[0] as 'sqlite' | 'mysql' | 'postgres' | '';
    this.connect();
  }

  private get getDB() {
    return this.db;
  }

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
  public async define(
    modelName: string,
    attributes: Record<string, any> = {},
    options: Record<string, any> & ModelOptions = {}
  ) {
    options.modelName = modelName;
    options.db = await this.getDB;
    options.databaseType = this.databaseType;

    const model = class extends Model { };
    model.init(modelName, attributes, options);

    return model;
  }

  public async connect(callback?: () => void) {
    if (!this.path) throw new Error('Database path is not defined.');
    this.db = SqlDatabase.load(this.path).catch((error) => {
      throw new Error(error);
    });
    await this.getDB;
    if (callback && typeof callback === 'function') callback();
  }

  /**
   * ### Close the database
   * @example
   * ``` ts
   * test.close();
   * ```
   */
  public async close() {
    (await this.db)?.close();
    this.db = null;
  }
}
