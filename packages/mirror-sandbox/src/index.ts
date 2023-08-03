import { getAccessType } from './utils';

/* eslint-disable @typescript-eslint/ban-ts-comment */
export type MirrorSandboxPlugin = (doc: Document) => void;

type MirrorSandboxHeadAttr = {
  [key: string]: any;
  script?: (Partial<HTMLScriptElement> | string)[];
  style?: string | string[];
  link?: Partial<HTMLLinkElement>[];
};

type MirrorSandboxOptions = {
  iframe: Partial<SandboxHTMLIFrameElement>;
  head?: MirrorSandboxHeadAttr;
  plugins?: MirrorSandboxPlugin[];
};

class MirrorSandbox {
  iframeRef: HTMLIFrameElement | null = null;
  private rawOptions: MirrorSandboxOptions = {} as MirrorSandboxOptions;
  private headAttributes = {} as MirrorSandboxHeadAttr;

  constructor(element: Element, options?: MirrorSandboxOptions) {
    if (!element) {
      throw new Error('element is required');
    }
    if (options) {
      this.rawOptions = options;
      const { head, iframe } = options;
      this.headAttributes = head || ({} as MirrorSandboxHeadAttr);
      this.createIframe(element, iframe);
    }
  }

  private get contentDocument() {
    return this.iframeRef?.contentDocument || null;
  }

  private createIframe(element: Element, iframeOptions: MirrorSandboxOptions['iframe']) {
    const iframe = document.createElement('iframe');

    for (const attr of Object.keys(iframeOptions)) {
      if (!iframeOptions[attr]) {
        console.warn(`iframe ${attr} is required`);
        continue;
      }
      if (typeof iframeOptions[attr] !== 'string') {
        console.warn(`iframe ${attr} must be string`);
        continue;
      }
      iframe.setAttribute(attr, iframeOptions[attr] as string);
    }

    this.iframeRef = iframe;

    element.appendChild(iframe);

    this.createIframeMarkdownBody();

    this.insertIframeHead(this.headAttributes);
    this.injectPlugin(this.rawOptions.plugins || []);
  }

  private createIframeMarkdownBody() {
    const { body } = this.contentDocument || ({} as Document);
    if (!body) return;

    const div = document.createElement('div');
    div.setAttribute('class', 'markdown-body');
    div.innerHTML = 'markdown';
    body.appendChild(div);

    return this;
  }

  private injectPlugin(plugin: MirrorSandboxPlugin[]) {
    if (!plugin) return;

    if (getAccessType(plugin) !== 'Array') {
      throw new Error('plugin must be array');
    }

    for (const item of plugin) {
      if (typeof item !== 'function') {
        throw new Error('plugin must be function');
      }

      if (!this.contentDocument) {
        throw new Error('contentDocument is null');
      }

      item(this.contentDocument);
    }
  }

  private insertIframeHead(headAttributes?: MirrorSandboxHeadAttr) {
    if (!headAttributes) return;

    const { head } = this.contentDocument || ({} as Document);
    if (!head) return;

    for (const key of Object.keys(headAttributes)) {
      if (!headAttributes[key]) continue;
      if (typeof headAttributes[key] === 'string') {
        const element = document.createElement(key);
        element.innerHTML = headAttributes[key] as string;
        head.appendChild(element);
      } else {
        // @ts-ignore
        for (const item of headAttributes[key] as any[]) {
          const element = document.createElement(key);

          if (typeof item === 'string') {
            element.innerHTML = item;
          } else {
            for (const attr of Object.keys(item)) {
              element.setAttribute(attr, item[attr]);
            }
          }
          head.appendChild(element);
        }
      }
    }
  }

  insertIframeBody(script: MirrorSandboxHeadAttr['script']) {
    const { body } = this.contentDocument || ({} as Document);
    if (!body || !script) return;

    for (const item of script) {
      if (typeof item === 'string') {
        const script = document.createElement('script');
        script.innerHTML = item;
        body.appendChild(script);
      } else {
        const script = document.createElement('script');
        for (const attr of Object.keys(item)) {
          // @ts-ignore
          script.setAttribute(attr, item[attr]);
        }
        body.appendChild(script);
      }
    }
    return this;
  }

  loadHtml(html: string) {
    const { body } = this.contentDocument || ({} as Document);
    if (!body) return;

    body.scrollTop = 0;

    const markdownBody = body.querySelector('.markdown-body');
    if (!markdownBody) return;

    markdownBody.innerHTML = html;
  }
}

export default MirrorSandbox;
