import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';
import onlyWarn from 'eslint-plugin-only-warn';

import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  // Plugins
  {
    plugins: {
      turbo: turboPlugin,
      onlyWarn,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
    },
  },
  // Import resolver + rules
  {
    settings: {},
    rules: {
      // Keep import errors surfaces
      'import/no-unresolved': 'error',

      'import/resolver': {
        typescript: {
          // Point to all tsconfigs in monorepo; tweak to your structure
          project: ['<rootDir>/**/tsconfig.json'],
          alwaysTryTypes: true,
        },
      },

      // Group/order imports and place "@/..." as "internal"
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal'],
            ['parent', 'sibling', 'index', 'object'],
            ['type'],
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',

          'newlines-between': 'always',
        },
      ],

      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
  // Ignores
  {
    ignores: ['dist/**', '**/generated/**'],
  },
];
