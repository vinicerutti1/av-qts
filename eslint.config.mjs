// @ts-check
import path from 'path';
import { fileURLToPath } from 'url';
import eslint from '@eslint/js';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import prettierConfig from 'eslint-config-prettier';
import * as importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import tsEslint from 'typescript-eslint';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const resolverConfig = {
    'import/resolver': {
        typescript: {
            project: [
                path.join(__dirname, 'tsconfig.json'),
                path.join(__dirname, 'client/tsconfig.json'),
                path.join(__dirname, 'server/tsconfig.json'),
            ],
            alwaysTryTypes: true,
            tsconfigRootDir: __dirname,
        },
        node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.mts', '.cts', '.mjs', '.cjs'],
            paths: [path.join(__dirname, 'node_modules')],
        },
    },
};

export default tsEslint.config(
    {
        ignores: ['**/dist/**', '**/node_modules/**'],
    },
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                browser: true,
                es2021: true,
                node: true,
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
            ...resolverConfig.settings,
        },
        plugins: {
            import: importPlugin,
            react: reactPlugin,
            '@stylistic/ts': stylisticTs,
        },
    },
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    reactRecommended,
    prettierConfig,
    {
        rules: {
            '@stylistic/ts/comma-dangle': ['error', 'always-multiline'],
            '@stylistic/ts/padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: '*', next: 'return' },
            ],
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'react/jsx-no-target-blank': 'error',
            quotes: ['error', 'single', { avoidEscape: true }],
            'jsx-quotes': 'off',
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                        'type',
                    ],
                    pathGroups: [
                        {
                            pattern: '@/**',
                            group: 'internal',
                        },
                        {
                            pattern: './**/*.css',
                            group: 'object',
                            position: 'after',
                        },
                    ],
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            'import/newline-after-import': 'error',
        },
    },
);
