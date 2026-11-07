import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // app/legacy is the previous site's code, converted to React in Phase 2; web/ is the previous site itself.
  {
    ignores: [
      'build/',
      '.react-router/',
      'node_modules/',
      'web/',
      'app/legacy/',
      'tests/__screens__/',
      'public/courses/nyc-taxi/vendor/',
      '**/.venv/',
      '**/__pycache__/',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: reactHooks.configs.recommended.rules,
    languageOptions: { globals: globals.browser },
  },
  { files: ['public/**/*.js'], languageOptions: { globals: globals.browser } },
  { files: ['scripts/**/*.mjs', 'tests/**/*.mjs', '*.config.*'], languageOptions: { globals: globals.node } },
);
