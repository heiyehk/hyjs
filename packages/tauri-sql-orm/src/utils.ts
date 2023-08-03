/**
 * get current local time
 * @param {string} timezone
 */
export const getLocalTime = (timezone = '+00:00') => {
  if (timezone === undefined) {
    return new Date().toISOString();
  }

  const [sign = '00', hour = '00', minute = '00'] = timezone.split(':');
  const offset = parseInt(hour) * 3600000 + parseInt(minute) * 60000;
  const localTime = sign === '+' ? new Date().getTime() + offset : new Date().getTime() - offset;

  return new Date(localTime).toISOString();
};

type AccessType =
  | 'Promise'
  | 'AsyncFunction'
  | 'String'
  | 'Object'
  | 'Number'
  | 'Boolean'
  | 'Symbol'
  | 'Undefined'
  | 'Null'
  | 'Function'
  | 'Date'
  | 'Array'
  | 'RegExp'
  | 'Error'
  | 'HTMLDocument'
  | 'global';

/**
 * 类型获取
 * @param access 参数
 */
export const getAccessType = (access: any): AccessType | string => {
  return Object.prototype.toString.call(access).slice(8, -1) as AccessType;
};
