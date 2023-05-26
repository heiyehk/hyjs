var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
/**
 * get current local time
 * @param {string} timezone
 */
export var getLocalTime = function (timezone) {
    if (timezone === void 0) { timezone = '+00:00'; }
    if (timezone === undefined) {
        return new Date().toISOString();
    }
    var _a = __read(timezone.split(':'), 3), _b = _a[0], sign = _b === void 0 ? '00' : _b, _c = _a[1], hour = _c === void 0 ? '00' : _c, _d = _a[2], minute = _d === void 0 ? '00' : _d;
    var offset = parseInt(hour) * 3600000 + parseInt(minute) * 60000;
    var localTime = sign === '+' ? new Date().getTime() + offset : new Date().getTime() - offset;
    return new Date(localTime).toISOString();
};
