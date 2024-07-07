import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

import pkg from "../../package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

/**
 *
 * @returns {import("rollup").RollupOptions}
 */
export function createRollupConfig(options, callback) {
  const name = options.name;
  // A file with the extension ".mjs" will always be treated as ESM, even when pkg.type is "commonjs" (the default)
  // https://nodejs.org/docs/latest/api/packages.html#packages_determining_module_system
  const extName = options.format === "esm" ? "mjs" : "js";
  const outputName = "dist/" + [name, options.format, extName].join(".");

  const config = {
    input: options.input,
    output: {
      file: outputName,
      format: options.format,
      name: "ReactSpotflowCheckout",
      sourcemap: true,
      globals: { react: "React", "react-dom": "ReactDOM" },
      exports: "named",
    },
    external: Object.keys(pkg.peerDependencies),
    plugins: [
      resolve({ extensions }),
      postcss({
        minimize: true,
        modules: true,
        use: {
          sass: null,
          stylus: null,
          less: { javascriptEnabled: true },
        },
        extract: true,
      }),
      typescript({
        tsconfig: options.tsconfig,
        clean: true,
        exclude: ["**/__tests__", "**/*.test.ts"],
        useTsconfigDeclarationDir: true,
        verbosity: 3,
      }),
      options.format === "umd" &&
        commonjs({
          include: /\/node_modules\//,
        }),
      options.format !== "esm" &&
        terser({
          output: { comments: false },
          compress: {
            drop_console: true,
          },
        }),
    ].filter(Boolean),
  };

  return callback ? callback(config) : config;
}
