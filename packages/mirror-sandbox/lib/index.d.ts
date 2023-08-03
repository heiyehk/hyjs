declare type MirrorSandboxPlugin = any;
declare type MirrorSandboxHeadAttr = {
    script: (HTMLScriptElement | string)[];
    style: (HTMLStyleElement | string)[];
    link: HTMLLinkElement[];
};
declare type MirrorSandboxOptions = {
    iframe: HTMLIFrameElement;
    head?: MirrorSandboxHeadAttr;
    plugins?: [];
};
declare class MirrorSandbox {
    iframeRef: HTMLIFrameElement | null;
    rawOptions: MirrorSandboxOptions;
    iframeAttributes: HTMLIFrameElement;
    headAttributes: MirrorSandboxHeadAttr;
    constructor(element: Element, options?: MirrorSandboxOptions);
    createIframe(element: Element, iframeOptions: HTMLIFrameElement): void;
    createIframeMarkdownBody(): this | undefined;
    injectPlugin(plugin: MirrorSandboxPlugin[]): void;
    insertIframeHead(headAttributes?: MirrorSandboxHeadAttr): void;
    insertIframeBody(script: MirrorSandboxHeadAttr['script']): this | undefined;
    loadMd(html: string): void;
}
export default MirrorSandbox;
