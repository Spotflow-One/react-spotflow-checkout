import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
// import { resolve } from "path";
import svgrPlugin from "vite-plugin-svgr";

const umdGlobals = {
  react: "React",
  "prop-types": "PropTypes",
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgrPlugin(), react(), tsConfigPaths()],
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
    },
    sourcemap: "inline",
  },
});
