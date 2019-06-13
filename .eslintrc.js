module.exports = {
	env: {
		browser: true,
		es6: true,
		commonjs: true,
		node: true
	},
	extends: [
		'airbnb',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended'
	],
	globals: {
		"__DEV__": "readonly"
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: "./tsconfig.json",
		ecmaVersion: 2018,
		ecmaFeatures: { jsx: true },
		sourceType: "module"
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-non-null-assertion': 0,
		'@typescript-eslint/indent': ['warn', 'tab', { SwitchCase: 1 }],
		'@typescript-eslint/interface-name-prefix': ['error', 'always'],
		'arrow-body-style': 0,
		'linebreak-style': ['warn', 'windows'],
		'no-param-reassign': ['error', { 'props': false }],
		'no-console': 0,
		'no-tabs': 0,
		'no-multiple-empty-lines': ['error', { max: 3, maxEOF: 1, maxBOF: 0 }],
		'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab']
	}
};
