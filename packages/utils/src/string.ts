/**
 * 下划线转驼峰
 * @param name
 * @returns
 */
export const toHump = (name: string) => {
  return name.replace(/_(\w)/g, (_: string, letter: string) => {
    return letter.toUpperCase();
  });
};

/**
 * 驼峰转下划线
 * @param name
 * @returns
 */
export const toLine = (name: string) => {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase();
};

/**
 * 生成随机4位数code
 * @returns
 */
export const random4Code = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

type RandomChar = (len: number, char: ('number' | 'lowercase' | 'capital')[]) => string;
/**
 * 生成指定长度的字符，可选择`number`(数字), `lowercase`(小写字母), `capital`(大写字母)
 * @param len
 * @param char
 * @returns
 */
export const randomChar: RandomChar = (len = 4, char = ['number', 'lowercase', 'capital']) => {
  const number = '1234567890';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const capital = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let character = '';
  let backChar = '';

  if (char.includes('number')) character += number;
  if (char.includes('lowercase')) character += lowercase;
  if (char.includes('capital')) character += capital;

  while (len) {
    const randomIndex = Math.floor(Math.random() * character.length);
    backChar += character[randomIndex];
    if (backChar.length === len) break;
  }

  return backChar;
};

/**
 * 生成uuid
 * @returns
 */
export const uuid = (): string => {
  return (
    random4Code() +
    random4Code() +
    '-' +
    random4Code() +
    '-' +
    random4Code() +
    '-' +
    random4Code() +
    '-' +
    random4Code() +
    random4Code() +
    random4Code()
  );
};
