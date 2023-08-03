export type AccessType =
  | 'Window'
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
  | 'HTMLDocument'
  | 'global';

/**
 * 类型获取
 * @param access 参数
 */
export const getAccessType = (access: any) => {
  return Object.prototype.toString.call(access).slice(8, -1) as AccessType;
};
