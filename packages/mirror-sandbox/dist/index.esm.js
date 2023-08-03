var __values = (undefined && undefined.__values) || function(o) {
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
var MirrorSandbox = /** @class */ (function () {
    function MirrorSandbox(element, options) {
        this.iframeRef = null;
        this.rawOptions = {};
        this.iframeAttributes = {};
        this.headAttributes = {};
        if (!element) {
            throw new Error('element is required');
        }
        if (options) {
            this.rawOptions = options;
            var head = options.head, iframe = options.iframe;
            this.iframeAttributes = iframe || {};
            this.headAttributes = head || {};
            this.createIframe(element, iframe);
        }
    }
    MirrorSandbox.prototype.createIframe = function (element, iframeOptions) {
        var e_1, _a;
        var iframe = document.createElement('iframe');
        try {
            for (var _b = __values(Object.keys(iframeOptions)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var attr = _c.value;
                // @ts-ignore
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
        var _a;
        var body = (((_a = this.iframeRef) === null || _a === void 0 ? void 0 : _a.contentDocument) || {}).body;
        if (!body)
            return;
        var div = document.createElement('div');
        div.setAttribute('class', 'markdown-body');
        div.innerHTML = 'markdown';
        body.appendChild(div);
        return this;
    };
    MirrorSandbox.prototype.injectPlugin = function (plugin) {
        // TODO
        console.log(plugin);
    };
    MirrorSandbox.prototype.insertIframeHead = function (headAttributes) {
        var e_2, _a, e_3, _b, e_4, _c;
        var _d;
        var head = (((_d = this.iframeRef) === null || _d === void 0 ? void 0 : _d.contentDocument) || {}).head;
        if (!head)
            return;
        try {
            // @ts-ignore
            for (var _e = __values(Object.keys(headAttributes)), _f = _e.next(); !_f.done; _f = _e.next()) {
                var key = _f.value;
                // @ts-ignore
                if (typeof headAttributes[key] === 'string') {
                    var element = document.createElement(key);
                    // @ts-ignore
                    element.innerHTML = headAttributes[key];
                }
                else {
                    try {
                        // @ts-ignore
                        for (var _g = (e_3 = void 0, __values(headAttributes[key])), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var item = _h.value;
                            var element = document.createElement(key);
                            if (typeof item === 'string') {
                                element.innerHTML = item;
                            }
                            else {
                                try {
                                    for (var _j = (e_4 = void 0, __values(Object.keys(item))), _k = _j.next(); !_k.done; _k = _j.next()) {
                                        var attr = _k.value;
                                        element.setAttribute(attr, item[attr]);
                                    }
                                }
                                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                finally {
                                    try {
                                        if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                                    }
                                    finally { if (e_4) throw e_4.error; }
                                }
                            }
                            head.appendChild(element);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    MirrorSandbox.prototype.insertIframeBody = function (script) {
        var e_5, _a, e_6, _b;
        var _c;
        var body = (((_c = this.iframeRef) === null || _c === void 0 ? void 0 : _c.contentDocument) || {}).body;
        if (!body)
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
                        for (var _d = (e_6 = void 0, __values(Object.keys(item))), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var attr = _e.value;
                            // @ts-ignore
                            script_3.setAttribute(attr, item[attr]);
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                    body.appendChild(script_3);
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (script_1_1 && !script_1_1.done && (_a = script_1.return)) _a.call(script_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return this;
    };
    MirrorSandbox.prototype.loadMd = function (html) {
        var _a;
        var body = (((_a = this.iframeRef) === null || _a === void 0 ? void 0 : _a.contentDocument) || {}).body;
        if (!body)
            return;
        var markdownBody = body.querySelector('.markdown-body');
        if (!markdownBody)
            return;
        markdownBody.innerHTML = html;
    };
    return MirrorSandbox;
}());

export { MirrorSandbox as default };
