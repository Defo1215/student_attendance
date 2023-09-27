import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import transformerDirective from "@unocss/transformer-directives";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({ transformers: [transformerDirective()] }),
    AutoImport({
      resolvers: [ VantResolver()],
    }),
    Components({
      resolvers: [
        VantResolver(),
      ],
    }),
  ],
});
