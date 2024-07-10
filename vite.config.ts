import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";
import svgrPlugin from "vite-plugin-svgr";
import { peerDependencies, name } from "./package.json";

const umdGlobals = {
  react: "React",
  "react-dom": "ReactDOM",
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgrPlugin(),
    tsConfigPaths(),
    dts({
      include: ["lib"],
      // include: ["src/index.tsx"],
      // beforeWriteFile: (filePath, content) => ({
      //   filePath: filePath.replace("/src", ""),
      //   content,
      // }),
    }),
  ],
  resolve: {
    alias: [
      { find: "@/", replacement: resolve(__dirname, "./src/") },
      { find: "@library/", replacement: resolve(__dirname, "./lib/") },
    ],
  },
  // build: {
  //   rollupOptions: {
  //     input: "./src/index.tsx",
  //     output: {
  //       name: "ReactSpotflowCheckout",
  //       exports: "named",
  //       globals: umdGlobals,
  //       format: "umd",
  //     },
  //     external: [...Object.keys(peerDependencies)],
  //   },
  //   lib: {
  //     entry: "./src/index.ts", // Specifies the entry point for building the library.
  //     name: "ReactSpotflowCheckout", // Sets the name of the generated library.
  //     fileName: (format) => `index.${format}.js`, // Generates the output file name based on the format.
  //     formats: ["cjs", "es", "umd"], // Specifies the output formats (CommonJS and ES modules).
  //   },
  //   sourcemap: true,
  //   emptyOutDir: true,
  // },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
      input: Object.fromEntries(
        // https://rollupjs.org/configuration-options/#input
        glob
          .sync("lib/**/*.{ts,tsx}", {
            ignore: ["lib/**/*.d.ts"],
          })
          .map((file) => [
            // 1. The name of the entry point
            // lib/nested/foo.js becomes nested/foo
            relative("lib", file.slice(0, file.length - extname(file).length)),
            // 2. The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
  assetsInclude: ["**/*.otf"],
});
