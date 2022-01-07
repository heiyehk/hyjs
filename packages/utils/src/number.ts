/**
 * 阿拉伯数字翻译成中文的大写数字
 * @param num
 * @returns
 */
export const numberToChinese = (num: number | string) => {
  const digital = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  const unit = ['', '十', '百', '仟', '萬', '億', '点', ''];
  const splitNumber = String(num).replace(/(^0*)/g, '').split('.');
  let index = 0;
  let chineseNumber = '';
  let len = splitNumber[0].length - 1;
  for (; len >= 0; len--) {
    switch (index) {
      case 0:
        chineseNumber = unit[7] + chineseNumber;
        break;
      case 4:
        if (!new RegExp('0{4}//d{' + (splitNumber[0].length - len - 1) + '}$').test(splitNumber[0]))
          chineseNumber = unit[4] + chineseNumber;
        break;
      case 8:
        chineseNumber = unit[5] + chineseNumber;
        unit[7] = unit[5];
        index = 0;
        break;
    }
    if (
      index % 4 === 2 &&
      splitNumber[0].charAt(len + 2) !== '0' &&
      splitNumber[0].charAt(len + 1) == '0'
    )
      chineseNumber = digital[0] + chineseNumber;
    if (splitNumber[0].charAt(len) !== '0')
      chineseNumber = digital[Number(splitNumber[0].charAt(len))] + unit[index % 4] + chineseNumber;
    index++;
  }

  if (splitNumber.length > 1) {
    // 加上小数部分(如果有小数部分)
    chineseNumber += unit[6];
    for (let i = 0; i < splitNumber[1].length; i++)
      chineseNumber += digital[Number(splitNumber[1].charAt(i))];
  }
  if (chineseNumber === '一十') chineseNumber = '十';
  if (chineseNumber.match(/^一/) && chineseNumber.length === 3)
    chineseNumber = chineseNumber.replace('一', '');
  return chineseNumber;
};

/**
 * 数字转大写金额
 * @param num
 * @returns
 */
export const convertCurrency = (money: number | string) => {
  // 汉字的数字
  const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  // 基本单位
  const cnIntRadice = ['', '拾', '佰', '仟'];
  // 对应整数部分扩展单位
  const cnIntUnits = ['', '万', '亿', '兆'];
  // 对应小数部分单位
  const cnDecUnits = ['角', '分', '毫', '厘'];
  // 整数金额时后面跟的字符
  const cnInteger = '整';
  // 整型完以后的单位
  const cnIntLast = '元';
  // 最大处理的数字
  // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
  const maxNum = 999999999999999.9999;
  // 金额整数部分
  let integerNum;
  // 金额小数部分
  let decimalNum;
  // 输出的中文金额字符串
  let chineseStr = '';
  // 分离金额后用的数组，预定义
  let parts;
  if (!money) return '';
  money = parseFloat(money as string);
  if (money >= maxNum) {
    // 超出最大处理数字
    return '';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  // 转换为字符串
  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0;
    const IntLen = integerNum.length;
    for (let i = 0; i < IntLen; i++) {
      const n = integerNum.substr(i, 1);
      const p = IntLen - i - 1;
      const q = p / 4;
      const m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        // 归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  // 小数部分
  if (decimalNum != '') {
    const decLen = decimalNum.length;
    for (let i = 0; i < decLen; i++) {
      const n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
};

/**
 * 指定范围内生成随机数字, 默认最小值是0
 * @param min
 * @default 0
 * @param max
 * @example
 * ``` ts
    randomNumber(100);
    // 32

    randomNumber(1, 3);
    // 2
    ```
 */
export const randomNumber = (min = 0, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
