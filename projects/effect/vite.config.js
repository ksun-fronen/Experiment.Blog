import {defineConfig}     from "vite";
import vue                from "@vitejs/plugin-vue";
import vueJsx             from "@vitejs/plugin-vue-jsx";
import {ViteMinifyPlugin} from "vite-plugin-minify";
import path               from "path";

export default defineConfig(() => {
  // todo: 如果是本地部署 - 则采用sourcemap的方式, 如果是build部署, 则忽略sourcemap

  return {
    build: {
      minify: "esbuild",
    },
    envDir: "./config",
    plugins: [
      vue(),
      vueJsx(),
      ViteMinifyPlugin(),
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      alias: [
        {
          find: "@",
          replacement: path.resolve("./src"),
        }, {
          find: "@modules",
          replacement: path.resolve("./src/modules"),
        }
      ],
    },
  };
});

/* function transformHtmlPlugin(data) {
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
} */
