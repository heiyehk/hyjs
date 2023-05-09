import SqlDatabase from 'tauri-plugin-sql-api';

export type DatabaseType = 'sqlite' | 'mysql' | 'postgres';

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

const autoIncrement = {
  sqlite: 'AUTOINCREMENT',
  mysql: 'AUTO_INCREMENT',
  postgres: 'SERIAL'
};

export const getKeysAndValues = (obj: Record<string, any>, options: Model['rawOptions']) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);

  if (options.timestamps) {
    if (options.createdAt) {
      const createdAtKey = typeof options.createdAt === 'string' ? options.createdAt : 'createdAt';
      keys.push(createdAtKey);
      values.push(new Date().toISOString());
    }
    if (options.updatedAt) {
      const updatedAtKey = typeof options.updatedAt === 'string' ? options.updatedAt : 'updatedAt';
      keys.push(updatedAtKey);
      values.push(new Date().toISOString());
    }
    if (options.deletedAt) {
      const deletedAtKey = typeof options.deletedAt === 'string' ? options.deletedAt : 'deletedAt';
      keys.push(deletedAtKey);
      values.push(null);
    }
  }
  return { keys, values };
};

export default class Model {
  [x: string]: any;

  static db: SqlDatabase;
  static rawAttributes: Record<string, any>;
  static modelName: string;
  static databaseType: DatabaseType;
  static rawOptions: Record<string, any> & ModelOptions;

  static get getDB(): SqlDatabase {
    return this.db;
  }

  static get getRawAttributes(): Record<string, any> {
    return this.rawAttributes;
  }

  static get getDBPath(): string {
    return this.db.path;
  }

  /**
   * init model
   * @param modelName
   * @param attributes
   * @param options
   * @returns
   */
  static async init(
    modelName: string,
    attributes: Record<string, any> = {},
    options: Record<string, any> & ModelOptions = {}
  ) {
    this.db = await options.db;
    this.modelName = modelName;
    this.rawAttributes = attributes;
    this.databaseType = options.databaseType;
    this.rawOptions = options;

    return this;
  }

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
  static async sync(options?: { force?: boolean }) {
    if (!this.getRawAttributes) throw new Error('Model not initialized, attributes is undefined.');
    if (options && options.force) {
      await this.drop();
    }
    const keys = Object.keys(this.getRawAttributes);

    if (this.rawOptions.timestamps) {
      if (this.rawOptions.createdAt) {
        const createdAtKey = typeof this.rawOptions.createdAt === 'string' ? this.rawOptions.createdAt : 'createdAt';
        this.getRawAttributes[createdAtKey] = {
          type: 'DATE',
          allowNull: false
        };
        keys.push(createdAtKey);
      }

      if (this.rawOptions.updatedAt) {
        const updatedAtKey = typeof this.rawOptions.updatedAt === 'string' ? this.rawOptions.updatedAt : 'updatedAt';
        this.getRawAttributes[updatedAtKey] = {
          type: 'DATE',
          allowNull: false
        };
        keys.push(updatedAtKey);
      }

      if (this.rawOptions.deletedAt) {
        const deletedAtKey = typeof this.rawOptions.deletedAt === 'string' ? this.rawOptions.deletedAt : 'deletedAt';
        this.getRawAttributes[deletedAtKey] = {
          type: 'DATE'
        };
        keys.push(deletedAtKey);
      }
    }

    const sqlValue = keys.map((item) => {
      let addSql = `${item} ${this.getRawAttributes[item].type}`;
      if (this.getRawAttributes[item].allowNull === false) {
        addSql += ' NOT NULL';
      }
      if (this.getRawAttributes[item].primaryKey) {
        addSql += ' PRIMARY KEY';
      }
      if (this.getRawAttributes[item].autoIncrement) {
        addSql += ` ${autoIncrement[this.databaseType]}`;
      }

      return addSql;
    });
    const sql = `CREATE TABLE IF NOT EXISTS ${this.modelName} (\r\n      ${sqlValue.join(', \r\n      ')}\r\n)`;

    const result = await this.getDB.execute(sql);

    if (this.rawOptions.initialAutoIncrement && this.rawOptions.initialAutoIncrement > 0) {
      if (this.databaseType === 'sqlite') {
        await this.getDB.execute(
          `UPDATE SQLITE_SEQUENCE SET seq = ${this.rawOptions.initialAutoIncrement} WHERE name = '${this.modelName}';`
        );
      } else {
        await this.getDB.execute(
          `ALTER TABLE ${this.modelName} AUTO_INCREMENT = ${this.rawOptions.initialAutoIncrement};`
        );
      }
    }

    return {
      result,
      modelName: this.modelName
    };
  }

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
  static async create(data: Record<string, any>) {
    const { keys, values } = getKeysAndValues(data, this.rawOptions);
    const placeholders = Array(keys.length).fill('?').join(', ');

    const result = await this.getDB.execute(
      `INSERT INTO ${this.modelName} (${keys.join(', ')}) VALUES (${placeholders});`,
      values
    );

    return result;
  }

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
  static async bulkCreate(data: Record<string, any>[]) {
    const { keys } = getKeysAndValues(data[0], this.rawOptions);
    const placeholders = Array(keys.length).fill('?').join(', ');

    const values = data
      .map((record) => {
        const { values } = getKeysAndValues(record, this.rawOptions);
        return values;
      })
      .flat();
    const placeholdersArr = Array(data.length).fill(`(${placeholders})`).join(', ');

    const result = await this.getDB
      .execute(`INSERT INTO ${this.modelName} (${keys.join(', ')}) VALUES ${placeholdersArr}`, values)
      .catch((error) => {
        throw new Error(error);
      });

    return result;
  }

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
  static async update(attributes: Record<string, any>, options: Record<string, any>) {
    const keys = Object.keys(attributes);
    const values = Object.values(attributes);

    let sql = `UPDATE ${this.modelName} SET `;
    if (this.databaseType === 'sqlite') {
      sql += `${keys.map((key) => `${key} = ?`).join(', ')} WHERE id = ${options.where.id}`;
    } else if (this.databaseType === 'mysql') {
      sql += `SET ${keys.map((key) => `\`${key}\` = ?`).join(', ')} WHERE \`id\` = ${options.where.id}`;
    } else if (this.databaseType === 'postgres') {
      sql += `SET ${keys.map((key) => `"${key}" = ?`).join(', ')} WHERE "id" = ${options.where.id}`;
    }

    const result = await this.getDB.execute(sql, values);
    return result;
  }

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
  static async destroy(options: Record<string, any>) {
    const keys = Object.keys(options);
    const values = Object.values(options);

    const result = await this.getDB.execute(
      `DELETE FROM ${this.modelName} WHERE ${keys.map((key) => `${key} = ?`).join(' AND ')} LIMIT 1`,
      values
    );

    return result;
  }

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
  static async findOne(options: Record<string, any>) {
    const keys = Object.keys(options);
    const values = Object.values(options);

    const result = await this.getDB.select(
      `SELECT * FROM ${this.modelName} WHERE ${keys.map((key) => `${key} = ?`).join(' AND ')} LIMIT 1`,
      values
    );

    return result;
  }

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
  static async findAll(options: FindOptions = {}) {
    const { where = {}, limit = 0, offset = 0, order = [] } = options;
    const keys = Object.keys(where);
    const values = Object.values(where);

    let sql = `SELECT * FROM ${this.modelName}`;
    if (keys.length) {
      sql += ` WHERE ${keys.map((key) => `${key} = ?`).join(' AND ')}`;
    }

    if (order && order.length) {
      sql += ` ORDER BY ${order[0]} ${order[1]}`;
    }

    if (limit) {
      sql += ` LIMIT ${limit}`;
    }

    if (offset) {
      sql += ` OFFSET ${offset}`;
    }

    const result = await this.getDB.select(sql, values).catch((error) => {
      throw new Error(error);
    });

    return result;
  }

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
  static async execute(sql: string, value?: any[]) {
    if (!value) {
      return this.getDB.execute(sql);
    }
    await this.getDB.execute(sql, value);
  }

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
  static async select(sql: string, value?: any[]) {
    if (!value) {
      return this.getDB.select(sql);
    }
    await this.getDB.select(sql, value);
  }

  /**
   * drop table
   * @returns
   */
  static async drop() {
    return await this.getDB.execute(`DROP TABLE IF EXISTS ${this.modelName}`);
  }
}
