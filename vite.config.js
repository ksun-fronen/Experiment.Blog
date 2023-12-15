import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import siteConfig from "./src/config/site.json";

const transformHtmlPlugin = data => ({
  name: "transform-html",
  transformIndexHtml: {
    enforce: "pre",
    transform(html) {
      return html.replace(
        /#{\s*(\w+)\s*}/gi,
        (match, p1) => data[p1] || ""
      );
    }
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    transformHtmlPlugin(siteConfig.IndexTemplateVariable),
  ],
});
