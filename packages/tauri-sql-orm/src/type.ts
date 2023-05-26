import SqlDatabase from 'tauri-plugin-sql-api';

import { DataTypes } from './data-types';

export type DatabaseType = 'sqlite' | 'mysql' | 'postgres';

export interface ModelAttributesProperties {
  /**
   * type of column in database table (sqlite, mysql, postgres)
   */
  type: DataTypes;
  /**
   * primary key
   *
   * @default: false
   */
  primaryKey?: boolean;
  /**
   * auto increment
   *
   * @default: false
   */
  autoIncrement?: boolean;
  /**
   * allow null
   *
   * @default: true
   */
  allowNull?: boolean;
  /**
   * default value
   * @default: null
   */
  defaultValue?: any;
  /**
   * unique
   *
   * @default: false
   */
  unique?: boolean;
  /**
   * comment
   *
   * @default: null
   */
  comment?: string;
}

/**
 * Model class attributes type definition
 */
export interface ModelAttributes {
  [key: string]: ModelAttributesProperties;
}

/**
 * Define the SQL ORM options
 */
export interface ModelOptions {
  /**
   * if
   */
  timestamps?: boolean;
  /**
   * if you want to use createdAt, you can set createdAt to true
   * or set createdAt to string, the string is the column name of the createdAt
   * @default: false
   */
  createdAt?: boolean | string;
  /**
   * if you want to use updatedAt, you can set updatedAt to true
   * or set updatedAt to string, the string is the column name of the updatedAt
   * @default: false
   */
  updatedAt?: boolean | string;
  /**
   * if you want to use soft delete, you can set deletedAt to true
   * or set deletedAt to string, the string is the column name of the soft delete
   * @default: false
   */
  deletedAt?: boolean | string;
  /** timezone */
  timezone?: string;
  /** initial auto increment */
  initialAutoIncrement?: number;
}

export interface ModelDefineOptions extends ModelOptions {
  /** database instance */
  db?: SqlDatabase | null;
  /** model name */
  modelName?: string;
  /** database type */
  databaseType?: DatabaseType;
}

/**
 * The timestamp of types and properties
 */
export interface TimestampsTypeAndProperties {
  /** key is timestamp column name */
  key: string;
  /** type is timestamp column type */
  type: DataTypes;
  /** properties is timestamp column properties */
  properties: ModelAttributesProperties;
}

/**
 * timestamp properties in ModelOptions
 */
export interface TimestampsProperties {
  createdAt?: TimestampsTypeAndProperties;
  updatedAt?: TimestampsTypeAndProperties;
  deletedAt?: TimestampsTypeAndProperties;
}

/**
 * find options for `findAll` and `findOne` methods of Model
 */
export interface FindOptionsWhere {
  /** where clause */
  where?: Record<string, any>;
}

export interface FindOptions extends FindOptionsWhere {
  /** if true, will include soft delete */
  paranoid?: boolean;
}

/** find options for `findAll` methods of Model */
export interface FindAllOptions extends FindOptions {
  /** limit the number of rows returned */
  limit?: number;
  /** skip the number of rows returned */
  offset?: number;
  /** order by column */
  order?: [string, 'ASC' | 'DESC' | 'asc' | 'desc'];
}

export interface DestroyOptions extends FindOptionsWhere {
  /** if true, will force delete */
  force?: boolean;
}

export type RestoreOptions = FindOptionsWhere;
