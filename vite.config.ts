import { resolve } from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import WindiCSS from "vite-plugin-windicss";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  plugins: [
    //@ts-ignore
    solidPlugin(),
    AutoImport({
      imports: [{
        "solid-js": [
          "batch",
          "createSignal",
          "createEffect",
          "createComputed",
          "untrack",
          "createMemo",
          "onCleanup",
          "onMount",
          "splitProps",
          "For",
          "Show",
          "createContext",
          "useContext",
        ],
        "solid-js/store": [
          "createMutable",
          "createStore",
          "unwrap",
        ],
        "immer": ["produce"],
        "~/lib/directives": ["modelText", "modelSelect", "resizeObserver", "dialogWithMouse"],
      }],
      resolvers: [
        IconsResolver({
          prefix: "Icon",
          extension: "jsx",
        }),
      ],
    }),
    Icons({ compiler: "solid" }),
    WindiCSS(),
    vanillaExtractPlugin(),
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
  resolve: {
    alias: {
      "~/api/": `${resolve(__dirname, "src/api")}/`,
      "~/lib/": `${resolve(__dirname, "src/lib")}/`,
      "~/store/": `${resolve(__dirname, "src/store")}/`,
      "~/element/": `${resolve(__dirname, "src/element")}/`,
      "~/component/": `${resolve(__dirname, "src/component")}/`,
    },
  },
});
