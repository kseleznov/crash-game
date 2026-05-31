import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import boundaries from "eslint-plugin-boundaries";
import reactCompiler from "eslint-plugin-react-compiler";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "node_modules/**",
    "next-env.d.ts",
    "*.config.js",
    "*.config.mjs",
  ]),
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      prettier,
      "react-compiler": reactCompiler,
    },
    rules: {
      "prettier/prettier": "error",
      "react-compiler/react-compiler": "error",
      "react/no-multi-comp": ["error", { ignoreStateless: true }],
      "react/forbid-prop-types": [
        "error",
        { forbid: ["any", "array", "object"] },
      ],
      "react/jsx-filename-extension": [
        "error",
        { extensions: [".jsx", ".tsx"] },
      ],
      "react/jsx-pascal-case": ["error", { allowAllCaps: true }],
      "react/jsx-closing-bracket-location": ["error", "line-aligned"],
      "react/jsx-closing-tag-location": "error",
      "react/jsx-tag-spacing": [
        "error",
        {
          closingSlash: "never",
          beforeSelfClosing: "always",
          afterOpening: "never",
          beforeClosing: "never",
        },
      ],
      "react/jsx-curly-spacing": ["error", { when: "never", children: true }],
      "react/jsx-boolean-value": ["error", "never"],
      "react/no-array-index-key": "warn",
      "react/no-string-refs": "error",
      "react/jsx-wrap-multilines": [
        "error",
        {
          declaration: "parens-new-line",
          assignment: "parens-new-line",
          return: "parens-new-line",
          arrow: "parens-new-line",
          condition: "parens-new-line",
          logical: "parens-new-line",
          prop: "parens-new-line",
        },
      ],
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],
      "react/jsx-no-bind": "warn",
      "react/require-render-return": "error",
      "react/no-is-mounted": "error",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "jsx-a11y/alt-text": [
        "error",
        {
          elements: ["img", "object", "area", 'input[type="image"]'],
          img: ["Image"],
          object: ["Object"],
          area: ["Area"],
          'input[type="image"]': ["InputImage"],
        },
      ],
      "jsx-a11y/img-redundant-alt": "error",
      "jsx-a11y/aria-role": [
        "error",
        {
          ignoreNonDOM: true,
        },
      ],
      "jsx-a11y/no-access-key": "error",
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],
      "jsx-a11y/label-has-associated-control": "error",
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/no-redundant-roles": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: true,
        },
      ],
      "jsx-quotes": ["error", "prefer-double"],
      "no-multi-spaces": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-alert": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "all"],
      "no-else-return": ["error", { allowElseIf: false }],
      "no-return-await": "error",
      "require-await": "error",
      "no-await-in-loop": "warn",
      "array-callback-return": "error",
      "default-case": "error",
      "dot-notation": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-extend-native": "error",
      "no-extra-bind": "error",
      "no-floating-decimal": "error",
      "no-implicit-coercion": "error",
      "no-lone-blocks": "error",
      "no-loop-func": "error",
      "no-new": "error",
      "no-new-func": "error",
      "no-new-wrappers": "error",
      "no-param-reassign": ["error", { props: false }],
      "no-proto": "error",
      "no-redeclare": "error",
      "no-return-assign": ["error", "always"],
      "no-script-url": "error",
      "no-self-compare": "error",
      "no-sequences": "error",
      "no-throw-literal": "error",
      "no-useless-call": "error",
      "no-useless-concat": "error",
      "no-useless-return": "error",
      radix: "error",
      yoda: "error",
      "no-duplicate-imports": "error",
      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
    },
  },
  {
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "src/app/**" },
        { type: "pages", pattern: "src/pages/*", capture: ["slice"] },
        { type: "widget", pattern: "src/widget/*", capture: ["slice"] },
        { type: "features", pattern: "src/features/*", capture: ["slice"] },
        { type: "entities", pattern: "src/entities/*", capture: ["slice"] },
        { type: "shared", pattern: "src/shared/**" },
      ],
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
      },
    },
    rules: {
      "boundaries/dependencies": [
        "warn",
        {
          default: "disallow",
          rules: [
            {
              from: { type: "app" },
              allow: {
                to: {
                  type: [
                    "app",
                    "pages",
                    "widget",
                    "features",
                    "entities",
                    "shared",
                  ],
                },
              },
            },
            {
              from: { type: "pages" },
              allow: {
                to: [
                  {
                    type: ["widget", "features", "entities"],
                    internalPath: "index.ts",
                  },
                  { type: "shared" },
                ],
              },
            },
            {
              from: { type: "widget" },
              allow: {
                to: [
                  { type: ["features", "entities"], internalPath: "index.ts" },
                  { type: "shared" },
                ],
              },
            },
            {
              from: { type: "features" },
              allow: {
                to: [
                  { type: "entities", internalPath: "index.ts" },
                  { type: "shared" },
                ],
              },
            },
            { from: { type: "entities" }, allow: { to: { type: "shared" } } },
            { from: { type: "shared" }, allow: { to: { type: "shared" } } },
          ],
        },
      ],
    },
  },
  eslintConfigPrettier,
]);

export default eslintConfig;
