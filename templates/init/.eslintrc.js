module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "comma-dangle": [2, "never"],
    quotes: [1, "double"],
    "max-len": 0,
    "no-underscore-dangle": 0,
    "arrow-parens": 0,
    "no-console": [1, { allow: ["error"] }]
  }
};
