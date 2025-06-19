import { include, exclude } from "./build/optimize";
import { getPluginsList } from "./build/plugins";
import { root, alias, wrapperEnv, pathResolve } from "./build/utils";
import { type UserConfigExport, type ConfigEnv, loadEnv } from "vite";

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_COMPRESSION, VITE_PUBLIC_PATH } = wrapperEnv(
    loadEnv(mode, root)
  );

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias,
    },
    plugins: getPluginsList(VITE_COMPRESSION),
    assetsInclude: ["**/*.svg"],
    // https://cn.vitejs.dev/config/dep-optimization-options.html#dep-optimization-options
    optimizeDeps: {
      include,
      exclude,
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      // https://cn.vitejs.dev/guide/build.html#browser-compatibility
      target: "es2015",
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve("./index.html", import.meta.url),
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor"; // 将第三方依赖打包成单独文件
            }
          },
        },
      },
    },
    define: {
      // 在生产环境下，禁用 Vue 的开发模式提示。
      __INTLIFY_PROD_DEVTOOLS__: false,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_OPTIONS_API__: false,
    },
    css: {
      modules: {
        scopeBehaviour: "global", // 所有类名都混淆，包括全局 CSS
      },
    },
  };
};
