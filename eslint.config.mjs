import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended"
  ),
  {
    plugins: ["prettier"],
    rules: {
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off", // Next.js doesn't require React to be in scope
      "react/jsx-uses-react": "off", // Next.js doesn't require React to be in scope
    },
  },
];

export default eslintConfig;