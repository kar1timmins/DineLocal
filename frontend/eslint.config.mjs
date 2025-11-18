import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Prettier integration
  prettierConfig,

  // Custom rules and plugins
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "prettier": prettierPlugin,
    },
    rules: {
      // Prettier as ESLint rule
      "prettier/prettier": "warn",

      // Import sorting
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            // Side effect imports (e.g., import './styles.css')
            ["^\\u0000"],
            // Node.js builtins
            ["^node:"],
            // React and Next.js
            ["^react", "^next"],
            // External packages
            ["^@?\\w"],
            // Internal packages (@/ alias)
            ["^@/"],
            // Parent imports (../)
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Sibling imports (./)
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",

      // React/Next.js best practices
      "react/prop-types": "off", // TypeScript handles this
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      // General code quality
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "warn",
      "no-debugger": "warn",
    },
  },

  // Ignore patterns
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "next-env.d.ts",
      ".pnpm-store/**",
      "public/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },
];

export default eslintConfig;
