import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
    // Base JS recommendations
    js.configs.recommended,

    // Disable rules that conflict with Prettier
    prettier,

    // Global ignores
    {
        ignores: ["node_modules/**", "dist/**", "build/**"],
    },

    // ----- JavaScript files -----
    {
        files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
                require: true,
                module: true,
                process: true,
                __dirname: true,
                __filename: true,
                exports: true,
                console: true,
            },
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            "prettier/prettier": "error",
            "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        },
    },

    // ----- TypeScript files -----
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                project: false,
            },
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            "prettier/prettier": "error",

            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        },
    },

    // ----- Test files (JS/TS) -----
    {
        files: ["**/__tests__/**/*.test.js", "**/__tests__/**/*.test.ts"],
        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },
    },
];
