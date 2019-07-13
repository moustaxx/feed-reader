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

	function withQuery(url: string, query: TQuery | string, opts?: Partial<TOpts>): string;
	function withQuery<T>(url: string, query: T, opts?: Partial<TOpts>): string;
	export default withQuery;
}
