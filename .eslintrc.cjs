module.exports = {
  root: true,
  env: { 
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: `${__dirname}/tsconfig-eslint.json`,
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "airbnb-base", "airbnb-typescript/base", "plugin:prettier/recommended", 'plugin:vitest-globals/recommended'],
  ignorePatterns: [
    "coverage",
    "testSetup.js",
    "*.config.ts"
  ],
  rules: {
    "prettier/prettier": ["error"],
    "quotes": ["error", "double"],
    "import/prefer-default-export": "off",
    semi: [2, "always"],
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/no-shadow": "warn", // TODO fix these errors and remove this line, so this is a real error.
    "class-methods-use-this": "off", // TODO see above,
    "import/no-extraneous-dependencies": "warn",
    "@typescript-eslint/no-explicit-any": "off"
  },
};
