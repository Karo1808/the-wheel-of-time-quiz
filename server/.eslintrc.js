module.exports = {
  env: {
    es2016: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "es2016",
    sourceType: "module",
  },
  plugins: ["eslint-plugin-react-compiler"],
  rules: {
    "react-compiler/react-compiler": "error",
  },
  plugins: ["@typescript-eslint"],
};
