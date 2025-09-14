import globals from "globals";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-unused-vars": "warn"
    }
  }
];
