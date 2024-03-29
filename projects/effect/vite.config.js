import { defineConfig }  from "vite";
import vue             from "@vitejs/plugin-vue";
import vueJsx          from "@vitejs/plugin-vue-jsx";
// import { fontSubsetter } from "./vite-plugin/font-subsetter/dist";
// import Unfonts from "unplugin-fonts/vite";
// import siteConfig     from "./src/config/site.json";
// import vike from "vike/plugin";

// https://vitejs.dev/config/
export default defineConfig(() => {
  // todo: 如果是本地部署 - 则采用sourcemap的方式, 如果是build部署, 则忽略sourcemap
  return {
    envDir: "./config",
    plugins: [
      vue(),
      vueJsx(),
      /*transformHtmlPlugin(
        Object.assign(
          {},
          siteConfig.IndexTemplateVariable,
          siteConfig.IndexTemplateVariable[config.mode] || {}
        )
      ),*/
    ],
  };
});

/*function transformHtmlPlugin(data) {
  return {
    name: "transform-html",
    transformIndexHtml: {
      enforce: "pre",
      transform(html) {
        return html.replace(
          /#{\s*([\w.]+)\s*}/gi,
          (match, p1) => {
            if (p1) {
              return p1.split(".").reduce((data, prop) => data[prop] || "", data);
            }
            return "";
          }
        );
      }
    }
  };
}*/
