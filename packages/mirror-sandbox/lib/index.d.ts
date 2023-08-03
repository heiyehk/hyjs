export declare type MirrorSandboxPlugin = (doc: Document) => void;
declare type MirrorSandboxHeadAttr = {
    [key: string]: any;
    script?: (Partial<HTMLScriptElement> | string)[];
    style?: string | string[];
    link?: Partial<HTMLLinkElement>[];
};
declare type MirrorSandboxOptions = {
    iframe: Partial<SandboxHTMLIFrameElement>;
    head?: MirrorSandboxHeadAttr;
    plugins?: MirrorSandboxPlugin[];
};
declare class MirrorSandbox {
    iframeRef: HTMLIFrameElement | null;
    private rawOptions;
    private headAttributes;
    constructor(element: Element, options?: MirrorSandboxOptions);
    private get contentDocument();
    private createIframe;
    private createIframeMarkdownBody;
    private injectPlugin;
    private insertIframeHead;
    insertIframeBody(script: MirrorSandboxHeadAttr['script']): this | undefined;
    loadHtml(html: string): void;
}
export default MirrorSandbox;
