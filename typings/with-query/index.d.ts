/* eslint-disable */
/// <reference types="qs" />

declare module 'with-query' {
	import qs from 'qs';

	type TQuery = { [key: string]: string | number | boolean};
	type TOpts = {
		parseOpt: qs.IParseOptions;
		stringifyOpt: qs.IStringifyOptions;
		noHash: boolean;
	};

	const withQuery: (url: string, query?: TQuery, opts?: Partial<TOpts>) => string = () => {};
	export default withQuery;
}
