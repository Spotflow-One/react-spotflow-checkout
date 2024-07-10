module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  globals: {
    window: true,
    module: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    // project: [
    //   "./tsconfig.json",
    //   "./commitlint.config.js",
    //   "./tsconfig.app.json",
    // ],
    tsconfigRootDir: __dirname,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "**/*.cjs",
    "**/*.spec.ts",
    "tailwind.config.js",
    "commitlint.config.js",
    "vite.config.ts",
    "**/*.spec.tsx",
    "node_modules",
    "scripts",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [0, { allowConstantExport: true }],
    "no-console": 1,
    "no-unused-vars": [0, { args: "after-used", argsIgnorePattern: "^_" }],
    "spaced-comment": 0,
    "no-explicit-any": 0,
    "@typescript-eslint/no-unused-vars": [
      2,
      { args: "after-used", argsIgnorePattern: "^_" },
    ],
  },
};
