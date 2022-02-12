module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  settings: {
    "import/resolver": {
      "babel-module": {
        alias: {
          assets: "./src/assets",
          "components/*": "./src/components",
          constants: "./src/constants",
          containers: "./src/containers",
          utils: "./src/utils",
          styles: "./src/styles",
        },
        allowExistingDirectories: true,
      },
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    indent: ["error", 4],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "prettier/prettier": "error",
  },
};
