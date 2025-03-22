// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tslint from 'typescript-eslint';
import nestTypedPlugin from '@darraghor/eslint-plugin-nestjs-typed';

export default tslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    plugins: {'@darraghor/nestjs-typed' : nestTypedPlugin },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@darraghor/nestjs-typed/injectable-should-be-provided': 'warn',
      '@darraghor/nestjs-typed/should-specify-forbid-unknown-values': 'warn',
    },
  },
);