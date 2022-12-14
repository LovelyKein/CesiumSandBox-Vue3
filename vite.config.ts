import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { loadEnv } from "vite";

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  // console.log("env", env);
  return {
    envDir: "./", // 用于加载 .env 文件的目录
    base: "./", // 设置打包路径,
    build: {
      outDir: "Cesium-Demo",
      target: "modules",
      sourcemap: false,
    },
    server: {
      port: 8060,
      open: true,
      proxy: {
        "/proxyApi": {
          target: "http://121.199.73.163:8091/",
          changeOrigin: true,
          secure: false,
          // 路径重写
          rewrite: (path) => path.replace(/^\/proxyApi/, ""),
          ws: false,
        },
        "/mapApi": {
          target: "http://localhost:3000/",
          changeOrigin: true,
          secure: false,
          // 路径重写
          rewrite: (path) => path.replace(/^\/mapApi/, ""),
          ws: false,
        },
      },
    },
    plugins: [vue()],
    resolve: {
      alias: {
        // 别名配置，键必须以斜线开始和结束
        "@": resolve(__dirname, "src"),
        "#": resolve(__dirname, "types"),
      },
    },
  };
});
