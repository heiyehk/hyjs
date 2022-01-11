/**
 * 阿拉伯数字翻译成中文的大写数字
 * @param num
 * @returns
 */
export var numberToChinese = function (num) {
    var digital = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    var unit = ['', '十', '百', '仟', '萬', '億', '点', ''];
    var splitNumber = String(num).replace(/(^0*)/g, '').split('.');
    var index = 0;
    var chineseNumber = '';
    var len = splitNumber[0].length - 1;
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
        if (index % 4 === 2 &&
            splitNumber[0].charAt(len + 2) !== '0' &&
            splitNumber[0].charAt(len + 1) == '0')
            chineseNumber = digital[0] + chineseNumber;
        if (splitNumber[0].charAt(len) !== '0')
            chineseNumber = digital[Number(splitNumber[0].charAt(len))] + unit[index % 4] + chineseNumber;
        index++;
    }
    if (splitNumber.length > 1) {
        // 加上小数部分(如果有小数部分)
        chineseNumber += unit[6];
        for (var i = 0; i < splitNumber[1].length; i++)
            chineseNumber += digital[Number(splitNumber[1].charAt(i))];
    }
    if (chineseNumber === '一十')
        chineseNumber = '十';
    if (chineseNumber.match(/^一/) && chineseNumber.length === 3)
        chineseNumber = chineseNumber.replace('一', '');
    return chineseNumber;
};
/**
 * 数字转大写金额
 * @param num
 * @returns
 */
export var convertCurrency = function (money) {
    // 汉字的数字
    var cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    // 基本单位
    var cnIntRadice = ['', '拾', '佰', '仟'];
    // 对应整数部分扩展单位
    var cnIntUnits = ['', '万', '亿', '兆'];
    // 对应小数部分单位
    var cnDecUnits = ['角', '分', '毫', '厘'];
    // 整数金额时后面跟的字符
    var cnInteger = '整';
    // 整型完以后的单位
    var cnIntLast = '元';
    // 最大处理的数字
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    var maxNum = 999999999999999.9999;
    // 金额整数部分
    var integerNum;
    // 金额小数部分
    var decimalNum;
    // 输出的中文金额字符串
    var chineseStr = '';
    // 分离金额后用的数组，预定义
    var parts;
    if (!money)
        return '';
    money = parseFloat(money);
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
    }
    else {
        parts = money.split('.');
        integerNum = parts[0];
        decimalNum = parts[1].substr(0, 4);
    }
    // 获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n == '0') {
                zeroCount++;
            }
            else {
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
        var decLen = decimalNum.length;
        for (var i = 0; i < decLen; i++) {
            var n = decimalNum.substr(i, 1);
            if (n != '0') {
                chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
        }
    }
    if (chineseStr == '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
    }
    else if (decimalNum == '') {
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
export var randomNumber = function (min, max) {
    if (min === void 0) { min = 0; }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
/**
 * 千分位分隔
 * @param value
 * @example
 * ``` ts
    currency(987654321);
    // '987,654,321.00'

    currency(987654321, 1);
    // '987,654,321.0'

    currency(987654321, 0);
    // '987,654,321'
    ```
 */
export var currency = function (value, len) {
    if (len === void 0) { len = 2; }
    if (!value)
        return len ? "0.".concat(new Array(len).fill(0).join('')) : '0';
    var newValue = Number(String(value).replace(/[^\d.-]/g, '')).toFixed(len) + '';
    var left = newValue.split('.')[0].split('').reverse();
    var right = newValue.split('.')[1];
    var t = '';
    for (var i = 0; i < left.length; i++) {
        t += left[i] + ((i + 1) % 3 === 0 && i + 1 !== left.length ? ',' : '');
    }
    if (right) {
        return t.split('').reverse().join('') + '.' + right;
    }
    return t.split('').reverse().join('');
};
