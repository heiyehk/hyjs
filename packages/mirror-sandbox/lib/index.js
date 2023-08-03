var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { getAccessType } from './utils';
var MirrorSandbox = /** @class */ (function () {
    function MirrorSandbox(element, options) {
        this.iframeRef = null;
        this.rawOptions = {};
        this.headAttributes = {};
        if (!element) {
            throw new Error('element is required');
        }
        if (options) {
            this.rawOptions = options;
            var head = options.head, iframe = options.iframe;
            this.headAttributes = head || {};
            this.createIframe(element, iframe);
        }
    }
    Object.defineProperty(MirrorSandbox.prototype, "contentDocument", {
        get: function () {
            var _a;
            return ((_a = this.iframeRef) === null || _a === void 0 ? void 0 : _a.contentDocument) || null;
        },
        enumerable: false,
        configurable: true
    });
    MirrorSandbox.prototype.createIframe = function (element, iframeOptions) {
        var e_1, _a;
        var iframe = document.createElement('iframe');
        try {
            for (var _b = __values(Object.keys(iframeOptions)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var attr = _c.value;
                if (!iframeOptions[attr]) {
                    console.warn("iframe ".concat(attr, " is required"));
                    continue;
                }
                if (typeof iframeOptions[attr] !== 'string') {
                    console.warn("iframe ".concat(attr, " must be string"));
                    continue;
                }
                iframe.setAttribute(attr, iframeOptions[attr]);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.iframeRef = iframe;
        element.appendChild(iframe);
        this.createIframeMarkdownBody();
        this.insertIframeHead(this.headAttributes);
        this.injectPlugin(this.rawOptions.plugins || []);
    };
    MirrorSandbox.prototype.createIframeMarkdownBody = function () {
        var body = (this.contentDocument || {}).body;
        if (!body)
            return;
        var div = document.createElement('div');
        div.setAttribute('class', 'markdown-body');
        div.innerHTML = 'markdown';
        body.appendChild(div);
        return this;
    };
    MirrorSandbox.prototype.injectPlugin = function (plugin) {
        var e_2, _a;
        if (!plugin)
            return;
        if (getAccessType(plugin) !== 'Array') {
            throw new Error('plugin must be array');
        }
        try {
            for (var plugin_1 = __values(plugin), plugin_1_1 = plugin_1.next(); !plugin_1_1.done; plugin_1_1 = plugin_1.next()) {
                var item = plugin_1_1.value;
                if (typeof item !== 'function') {
                    throw new Error('plugin must be function');
                }
                if (!this.contentDocument) {
                    throw new Error('contentDocument is null');
                }
                item(this.contentDocument);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (plugin_1_1 && !plugin_1_1.done && (_a = plugin_1.return)) _a.call(plugin_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    MirrorSandbox.prototype.insertIframeHead = function (headAttributes) {
        var e_3, _a, e_4, _b, e_5, _c;
        if (!headAttributes)
            return;
        var head = (this.contentDocument || {}).head;
        if (!head)
            return;
        try {
            for (var _d = __values(Object.keys(headAttributes)), _e = _d.next(); !_e.done; _e = _d.next()) {
                var key = _e.value;
                if (!headAttributes[key])
                    continue;
                if (typeof headAttributes[key] === 'string') {
                    var element = document.createElement(key);
                    element.innerHTML = headAttributes[key];
                    head.appendChild(element);
                }
                else {
                    try {
                        // @ts-ignore
                        for (var _f = (e_4 = void 0, __values(headAttributes[key])), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var item = _g.value;
                            var element = document.createElement(key);
                            if (typeof item === 'string') {
                                element.innerHTML = item;
                            }
                            else {
                                try {
                                    for (var _h = (e_5 = void 0, __values(Object.keys(item))), _j = _h.next(); !_j.done; _j = _h.next()) {
                                        var attr = _j.value;
                                        element.setAttribute(attr, item[attr]);
                                    }
                                }
                                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                finally {
                                    try {
                                        if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                                    }
                                    finally { if (e_5) throw e_5.error; }
                                }
                            }
                            head.appendChild(element);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    MirrorSandbox.prototype.insertIframeBody = function (script) {
        var e_6, _a, e_7, _b;
        var body = (this.contentDocument || {}).body;
        if (!body || !script)
            return;
        try {
            for (var script_1 = __values(script), script_1_1 = script_1.next(); !script_1_1.done; script_1_1 = script_1.next()) {
                var item = script_1_1.value;
                if (typeof item === 'string') {
                    var script_2 = document.createElement('script');
                    script_2.innerHTML = item;
                    body.appendChild(script_2);
                }
                else {
                    var script_3 = document.createElement('script');
                    try {
                        for (var _c = (e_7 = void 0, __values(Object.keys(item))), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var attr = _d.value;
                            // @ts-ignore
                            script_3.setAttribute(attr, item[attr]);
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                    body.appendChild(script_3);
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (script_1_1 && !script_1_1.done && (_a = script_1.return)) _a.call(script_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return this;
    };
    MirrorSandbox.prototype.loadHtml = function (html) {
        var body = (this.contentDocument || {}).body;
        if (!body)
            return;
        body.scrollTop = 0;
        var markdownBody = body.querySelector('.markdown-body');
        if (!markdownBody)
            return;
        markdownBody.innerHTML = html;
    };
    return MirrorSandbox;
}());
export default MirrorSandbox;
