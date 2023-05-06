import SqlDatabase from 'tauri-plugin-sql-api';

import Model from './model';

export default class SqlORM {
  /** 数据库实例 */
  db: Promise<SqlDatabase> | null = null;

  /** 数据库路径 */
  path = '';

  constructor(path: string) {
    this.init(path);
  }

  async init(path: string) {
    this.path = await this.parsingPath(path);
  }

  async getDB(): Promise<SqlDatabase> {
    return new Promise((resolve) => {
      const timer = setInterval(() => {
        this.db = SqlDatabase.load(this.path);
        if (this.db) {
          clearInterval(timer);
          resolve(this.db);
        }
      }, 100);
    });
  }

  async parsingPath(path: string) {
    if (path.startsWith('sqlite:')) return path;
    return `sqlite:${path}`;
  }

  async define(modelName: string, attributes: Record<string, any> = {}, options: Record<string, any> = {}) {
    options.modelName = modelName;
    options.db = await this.getDB();

    const model = class extends Model { };

    model.init(modelName, attributes, options);

    return model;
  }

  async connect(callback?: () => void) {
    this.db = this.getDB();
    if (callback && typeof callback === 'function') callback();
  }

  async close() {
    this.path = '';
    (await this.db)?.close();
    this.db = null;
  }
}
