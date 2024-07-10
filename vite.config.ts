import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import svgrPlugin from "vite-plugin-svgr";
import { peerDependencies } from "./package.json";

const umdGlobals = {
  react: "React",
  "react-dom": "ReactDOM",
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgrPlugin(), tsConfigPaths(), dts()],
  resolve: {
    alias: [{ find: "@/", replacement: resolve(__dirname, "./src/") }],
  },
  build: {
    rollupOptions: {
      input: "./src/index.tsx",
      output: {
        // manualChunks(id) {
        //   if (id.includes(".svg?react")) {
        //     return id
        //       .toString()
        //       .split("/")
        //       [id.toString().split("/").length - 1].split("?react")[0]
        //       .toString();
        //   }
        // },
        name: "ReactSpotflowCheckout",
        exports: "named",
        globals: umdGlobals,
        format: "umd",
      },
      external: [...Object.keys(peerDependencies)],
    },
    lib: {
      entry: "./src/index.ts", // Specifies the entry point for building the library.
      name: "react-spotflow-checkout", // Sets the name of the generated library.
      fileName: (format) => `index.${format}.js`, // Generates the output file name based on the format.
      formats: ["cjs", "es"], // Specifies the output formats (CommonJS and ES modules).
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
