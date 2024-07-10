import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import alias from "@rollup/plugin-alias";
import { resolve as pathResolve } from "path";

const umdGlobals = {
  react: "React",
  "prop-types": "PropTypes",
  "react-dom": "ReactDOM",
};

module.exports = [
  {
    input: "./src/index.tsx",
    output: {
      file: "dist/index.js",
      format: "umd",
      name: "ReactSpotflowCheckout",
      globals: umdGlobals,
      sourcemap: true,
      exports: "named",
    },
    external: Object.keys(umdGlobals),
    plugins: [
      resolve(),
      commonjs({ include: "**/node_modules/**" }),
      babel({
        exclude: "**/node_modules/**",
        babelHelpers: "bundled",
      }),
      terser(),
      typescript(),
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
      alias({
        // eslint-disable-next-line no-undef
        entries: [{ find: "@/", replacement: pathResolve(__dirname, "src") }],
      }),
    ],
  },
];
