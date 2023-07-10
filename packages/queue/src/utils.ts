export type AccessType =
  | 'String'
  | 'Object'
  | 'Number'
  | 'Boolean'
  | 'Symbol'
  | 'Undefined'
  | 'Null'
  | 'Function'
  | 'AsyncFunction'
  | 'Date'
  | 'Array'
  | 'RegExp'
  | 'Error'
  | 'Promise'
  | 'global';

/**
 * 类型获取
 * @param access 参数
 */
export const getAccessType = (access: any): AccessType => {
  return Object.prototype.toString.call(access).slice(8, -1) as AccessType;
};

export const isNullOrUndefined = (access: any): boolean => access === null || access === undefined;
export const isError = (access: any): boolean => getAccessType(access) === 'Error';
