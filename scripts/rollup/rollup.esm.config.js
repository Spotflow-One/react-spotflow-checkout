import pkg from "../../package.json";

import { createRollupConfig } from "./create-rollup-config";

export default createRollupConfig({
  name: "index",
  format: "esm",
  input: pkg.source,
});
