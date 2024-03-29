module.exports = {
	env: {
		browser: true,
		es6: true,
		commonjs: true
	},
	extends: [
		'eslint-config-airbnb-typescript',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended'
	],
	parserOptions: {
		project: "./tsconfig.json",
		ecmaVersion: 2018,
		ecmaFeatures: { jsx: true },
		sourceType: "module"
	},
	plugins: ["react-hooks"],
	rules: {
		'@typescript-eslint/array-type': 0,
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-non-null-assertion': 0,
		'@typescript-eslint/no-unused-vars': ["warn", { "argsIgnorePattern": "^_" }],
		'@typescript-eslint/indent': ['warn', 'tab', { SwitchCase: 1 }],
		'@typescript-eslint/interface-name-prefix': ['error', 'always'],
		'arrow-body-style': 0,
		'import/no-cycle': [2, { maxDepth: 1 }],
		'linebreak-style': ['warn', 'windows'],
		'no-alert': 0,
		'no-console': 0,
		'no-param-reassign': ['error', { 'props': false }],
		'no-tabs': 0,
		'no-multiple-empty-lines': ['error', { max: 3, maxEOF: 1, maxBOF: 0 }],
		'no-void': 0,
		'object-curly-newline': ["error", { "consistent": true }],
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/jsx-props-no-spreading': 0,
		'react/no-children-prop': 0,
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		'react/prop-types': 0,
	},
};
