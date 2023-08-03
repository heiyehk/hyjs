interface SandboxHTMLIFrameElement extends HTMLIFrameElement {
  [key: string]: string;
  frameborder?: string;
  sandbox?: string;
  style?: string;
}
