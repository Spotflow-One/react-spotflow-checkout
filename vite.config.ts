import { defineConfig } from "vite";
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
import { peerDependencies } from "./package.json";
import alias from "@rollup/plugin-alias";
// import { libInjectCss } from 'vite-plugin-lib-inject-css'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    // libInjectCss(),
    dts({ include: ["lib"] }),
  ],
  resolve: {
    alias: {
      "@library": resolve(__dirname, "lib"),
    },
  },
  build: {
    // copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      plugins: [
        alias({
          entries: [
            { find: "@library", replacement: resolve(__dirname, "lib") },
          ],
        }),
      ],
      output: {
        manualChunks(id) {
          if (id.includes(".svg?react")) {
            return id
              .toString()
              .split("/")
              [id.toString().split("/").length - 1].split("?react")[0]
              .toString();
          }
        },
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
    // rollupOptions: {
    //   external: Object.keys(peerDependencies),
    //   input: Object.fromEntries(
    //     // https://rollupjs.org/configuration-options/#input
    //     glob
    //       .sync("lib/**/*.{ts,tsx}", {
    //         ignore: ["lib/**/*.d.ts"],
    //       })
    //       .map((file) => [
    //         // 1. The name of the entry point
    //         // lib/nested/foo.js becomes nested/foo
    //         relative("lib", file.slice(0, file.length - extname(file).length)),
    //         // 2. The absolute path to the entry file
    //         // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
    //         fileURLToPath(new URL(file, import.meta.url)),
    //       ]),
    //   ),
    //   output: {
    //     assetFileNames: "assets/[name][extname]",
    //     entryFileNames: "[name].js",
    //   },
    // },
  },
});
