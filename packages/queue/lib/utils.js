/**
 * 类型获取
 * @param access 参数
 */
export var getAccessType = function (access) {
    return Object.prototype.toString.call(access).slice(8, -1);
};
export var isNullOrUndefined = function (access) { return access === null || access === undefined; };
export var isError = function (access) { return getAccessType(access) === 'Error'; };
