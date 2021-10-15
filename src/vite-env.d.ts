/// <reference types="solid-js" />
/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/solid" />
import "solid-js"

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      modelText: [() => any, (v: any) => void];
      modelSelect: [() => any, (v: any) => void];
      resizeObserver: (rect: DOMRectReadOnly) => void;
      dialogWithMouse: any;
    }
  }
}
