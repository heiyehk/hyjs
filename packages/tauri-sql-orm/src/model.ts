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

  static get getDB(): SqlDatabase {
    return this.db;
  }

  static async init(modelName: string, attributes: Record<string, any> = {}, options: Record<string, any> = {}) {
    this.db = options.db;
    this.modelName = modelName;

    this.rawAttributes = attributes;

    return this;
  }

  static async create(data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const result = await this.getDB.execute(
      `INSERT INTO ${this.modelName} (${keys.join(', ')}) VALUES (${values.join(', ')});`
    );

    return result;
  }

  static async bulkCreate(data: Record<string, any>[]) {
    const keys = Object.keys(data[0]);
    const placeholders = Array(keys.length).fill('?').join(', ');

    const values = data.map((record) => Object.values(record)).flat();
    const placeholdersArr = Array(data.length).fill(`(${placeholders})`).join(', ');

    const result = await this.getDB.execute(
      `INSERT INTO ${this.modelName} (${keys.join(', ')}) VALUES ${placeholdersArr}`,
      ...values
    );

    return result;
  }

  static async findOne(options: Record<string, any>) {
    const keys = Object.keys(options);
    const values = Object.values(options);

    const result = await this.getDB.select(
      `SELECT * FROM ${this.modelName} WHERE ${keys.map((key) => `${key} = ?`).join(' AND ')} LIMIT 1`,
      values
    );

    return result;
  }

  static async findAll(options: Record<string, any> = {}) {
    const keys = Object.keys(options);
    const values = Object.values(options);

    const result = await this.getDB.select(
      `SELECT * FROM ${this.modelName} ${keys.length ? `WHERE ${keys.map((key) => `${key} = ?`).join(' AND ')}` : ''}`,
      ...values
    );

    return result;
  }

  static async sync(options?: { force?: boolean }) {
    if (options && options.force) {
      await this.drop();
    }
    const keys = Object.keys(this.rawAttributes);
    const sqlValue = keys.map((item) => {
      let addSql = `${item} ${this.rawAttributes[item].type}`;
      if (this.rawAttributes[item].allowNull === false) {
        addSql += ' NOT NULL';
      }
      if (this.rawAttributes[item].primaryKey) {
        addSql += ' PRIMARY KEY';
      }
      if (this.rawAttributes[item].autoIncrement) {
        addSql += ' AUTOINCREMENT';
      }

      return addSql;
    });
    const sql = `CREATE TABLE IF NOT EXISTS ${this.modelName} (\r\n      ${sqlValue.join(', \r\n      ')}\r\n)`;
    const result = await this.getDB.execute(sql);

    return {
      result,
      modelName: this.modelName
    };
  }

  static async drop() {
    await this.getDB.execute(`DROP TABLE IF EXISTS ${this.modelName}`);
  }
}
