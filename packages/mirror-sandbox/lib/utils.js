/**
 * 类型获取
 * @param access 参数
 */
export var getAccessType = function (access) {
    return Object.prototype.toString.call(access).slice(8, -1);
};
