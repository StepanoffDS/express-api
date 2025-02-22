import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
	{
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			prettier: prettierPlugin,
		},
	},
	{
		ignores: ['dist', 'node_modules'],
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.node,
			},
			parserOptions: {
				project: ['tsconfig.json'],
			},
		},
	},
	{
		files: ['**/*.{ts,tsx}'],
		rules: {
			...prettierPlugin.configs.recommended.rules,
			...eslintConfigPrettier.rules,
			'@typescript-eslint/ban-types': 'off',
			'@typescript-eslint/no-unused-vars': ['off'],
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/explicit-function-return-type': ['warn'],
			'prettier/prettier': [
				'error',
				{
					semi: true,
					singleQuote: true,
					jsxSingleQuote: true,
					bracketSpacing: true,
					trailingComma: 'all',
					printWidth: 80,
					tabWidth: 2,
					arrowParens: 'always',
					endOfLine: 'auto',
					useTabs: true,
				},
			],
		},
	},
);
