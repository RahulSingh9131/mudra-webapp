/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  trailingComma: "es5",
  bracketSpacing: true,
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  arrowParens: "always",
  semi: true,
};

export default config;
