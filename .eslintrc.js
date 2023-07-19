const path = require("path");
const typescriptRules = require("./rules/typescriptRules");
const jsRules = require("./rules/jsRules");
const commonRules = require("./rules/commonRules");

module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
    node: true,
  },
  globals: {
    is: "readonly",
  },
  root: true,
  extends: ["eslint:recommended", "plugin:react/recommended"],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      },
    },
    "import/extensions": [".js", ".jsx", ".ts", ".tsx", ".json"],
    "import/external-module-folders": ["node_modules", "core_modules"],
    "import/ignore": [
      "node_modules",
      "\\.(scss|css|less|hbs|svg|json|png|jpg|gif)$",
    ],
  },
  ignorePatterns: ["/build/**", "plopfile.js"],
  overrides: [
    {
      files: ["*.js", "*.test.js"],
      parser: "@babel/eslint-parser",
      extends: ["eslint:recommended", "plugin:react/recommended"],
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: [
        "react",
        "jest",
        "unused-imports",
        "react-hooks",
        "testing-library",
        "@emotion",
      ],
      rules: {
        ...commonRules,
        ...jsRules,
      },
    },
    {
      extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true,
        },
        project: path.resolve(__dirname, "tsconfig.json"),
      },
      plugins: [
        "react",
        "jest",
        "unused-imports",
        "react-hooks",
        "testing-library",
        "@typescript-eslint",
        "@emotion",
      ],
      rules: {
        ...commonRules,
        ...typescriptRules,
      },
    },
  ],
};
