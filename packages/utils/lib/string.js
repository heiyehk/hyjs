/**
 * 下划线转驼峰
 * @param name
 * @returns
 */
export var toHump = function (name) {
    return name.replace(/_(\w)/g, function (_, letter) {
        return letter.toUpperCase();
    });
};
/**
 * 驼峰转下划线
 * @param name
 * @returns
 */
export var toLine = function (name) {
    return name.replace(/([A-Z])/g, '_$1').toLowerCase();
};
/**
 * 生成随机4位数code
 * @returns
 */
export var random4Code = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
/**
 * 生成指定长度的字符，可选择`number`(数字), `lowercase`(小写字母), `capital`(大写字母)
 * @param len
 * @param char
 * @returns
 */
export var randomChar = function (len, char) {
    if (len === void 0) { len = 4; }
    if (char === void 0) { char = ['number', 'lowercase', 'capital']; }
    var number = '1234567890';
    var lowercase = 'abcdefghijklmnopqrstuvwxyz';
    var capital = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var character = '';
    var backChar = '';
    if (char.includes('number'))
        character += number;
    if (char.includes('lowercase'))
        character += lowercase;
    if (char.includes('capital'))
        character += capital;
    while (len) {
        var randomIndex = Math.floor(Math.random() * character.length);
        backChar += character[randomIndex];
        if (backChar.length === len)
            break;
    }
    return backChar;
};
/**
 * 生成uuid
 * @returns
 */
export var uuid = function () {
    return (random4Code() +
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
        random4Code());
};
