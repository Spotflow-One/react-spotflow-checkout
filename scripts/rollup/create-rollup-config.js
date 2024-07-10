import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import alias from "@rollup/plugin-alias";
import { resolve as pathResolve } from "path";
import pkg from "../../package.json";
import { rootDir } from "../config";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const babelPlugin = babel({
  extensions,
  babelHelpers: "bundled",
  include: ["src/**/*"],
});

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
      babel({
        extensions,
        babelHelpers: "bundled",
        include: ["src/**/*"],
      }),
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
        tsconfig: pathResolve(rootDir, "tsconfig.json"),
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
      alias({
        entries: [{ find: "@/", replacement: pathResolve(rootDir, "src/") }],
      }),
    ].filter(Boolean),
  };

  return callback ? callback(config) : config;
}

/**
 * @param {Object} opts - Options for building configurations.
 * @param {string} opts.name - The name.
 * @param {string} opts.jsName - The UMD name.
 * @param {string} opts.outputFile - The output file.
 * @param {string} opts.entryFile - The entry file.
 * @param {Record<string, string>} opts.globals
 * @param {string[]} opts.external
 * @returns {import('rollup').RollupOptions[]}
 */
export function buildConfigs(opts) {
  const input = resolve(opts.entryFile);

  /** @param {string} moduleName */
  const external = (moduleName) => opts.external.includes(moduleName);
  const umdExternal = Object.keys(opts.globals);
  const banner = createBanner(opts.name);

  const options = {
    input,
    jsName: opts.jsName,
    outputFile: opts.outputFile,
    external,
    banner,
    globals: opts.globals,
  };

  return [
    mjs(options),
    esm(options),
    cjs(options),
    umdDev({ ...options, external: umdExternal }),
    umdProd({ ...options, external: umdExternal }),
  ];
}

/**
 * @param {Object} opts - Options for building configurations.
 * @param {string} opts.input - The name.
 * @param {string} opts.jsName - The UMD name.
 * @param {string} opts.outputFile - The output file.
 * @param {any} opts.external
 * @param {string} opts.banner - The entry file.
 * @param {Record<string, string>} opts.globals
 * @returns {import('rollup').RollupOptions}
 */
function mjs({ input, external, banner, outputFile }) {
  return {
    // ESM
    external,
    input,
    output: {
      format: "esm",
      sourcemap: true,
      file: `./build/lib/${outputFile}.mjs`,
      banner,
    },
    plugins: [
      commonjs(),
      babelPlugin,
      nodeResolve({ extensions: [".ts", ".tsx"] }),
    ],
  };
}

/**
 * @param {Object} opts - Options for building configurations.
 * @param {string} opts.input - The name.
 * @param {string} opts.jsName - The UMD name.
 * @param {string} opts.outputFile - The output file.
 * @param {any} opts.external
 * @param {string} opts.banner - The entry file.
 * @param {Record<string, string>} opts.globals
 * @returns {import('rollup').RollupOptions}
 */
function esm({ input, external, banner, outputFile }) {
  return {
    // ESM
    external,
    input,
    output: {
      format: "esm",
      sourcemap: true,
      file: `./build/lib/${outputFile}.esm.js`,
      banner,
    },
    plugins: [
      commonjs(),
      babelPlugin,
      resolve({ extensions: [".ts", ".tsx"] }),
    ],
  };
}

/**
 * @param {Object} opts - Options for building configurations.
 * @param {string} opts.input - The name.
 * @param {string} opts.jsName - The UMD name.
 * @param {string} opts.outputFile - The output file.
 * @param {any} opts.external
 * @param {string} opts.banner - The entry file.
 * @param {Record<string, string>} opts.globals
 * @returns {import('rollup').RollupOptions}
 */
function cjs({ input, external, banner }) {
  return {
    // CJS
    external,
    input,
    output: {
      format: "cjs",
      sourcemap: true,
      dir: `./build/lib`,
      preserveModules: true,
      exports: "named",
      banner,
    },
    plugins: [
      commonjs(),
      babelPlugin,
      resolve({ extensions: [".ts", ".tsx"] }),
    ],
  };
}

/** @param {string} libraryName */
function createBanner(libraryName) {
  return `/**
   * ${libraryName}
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */`;
}
