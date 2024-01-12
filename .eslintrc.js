/* global module */
module.exports = {
  env: {
    es6: true,
    browser: true,
    "es2020": true,  
  },
  globals: {
    process: "readonly",
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "next/core-web-vitals",
    "eslint:recommended",
  ],
  rules: {
    curly: ["warn", "multi-line", "consistent"],
    "no-bitwise": "warn",
    "no-console": "off",
    "no-param-reassign": "warn",
    "no-shadow": "warn",
    "no-unused-vars": "off",
    "prefer-const": "warn",
    radix: ["warn", "always"],
    "spaced-comment": ["warn", "always", { line: { markers: ["/ <reference"] } }],
    "react/no-unescaped-entities": ["warn", { forbid: [">", "}"] }], // by default we can't use ' which is annoying
    "react/prop-types": "off",
    "eslint/no-empty-function": "off",
    "react/jsx-key": ["off"], // prevent error when using FlexRow
    "react-hooks/exhaustive-deps": ["off"],
    "prefer-const": ["off"]
  },
  overrides: [],
};
