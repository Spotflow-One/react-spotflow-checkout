import pkg from "../../package.json";
import { resolve as pathResolve } from "path";

import { createRollupConfig } from "./create-rollup-config";
import { rootDir } from "../config";

const name = "index";
const options = [
  {
    name,
    format: "cjs",
    input: pkg.source,
  },
  { name, format: "esm", input: pkg.source },
  {
    name: "react-server",
    format: "esm",
    input: pathResolve(rootDir, "src/index.react-server.ts"),
  },
  {
    name,
    format: "umd",
    input: pkg.source,
  },
];

export default options.map((option) => createRollupConfig(option));
