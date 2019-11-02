import * as SecureStore from 'expo-secure-store';

import { BASE_URL } from '../../config';
import refreshAccessToken from '../API/refreshAccessToken';

export interface IFeedlyError {
	errorCode: number;
	errorMessage?: string;
	errorId?: string;
}

export const getAccessToken = async () => {
	const token = await SecureStore.getItemAsync('accessToken');
	return token;
};

const throwErr = (status: number) => {
	throw Error(`Error ${status}: Response is not ok.`);
};

export async function makeRequestFetch(url: string, options: RequestInit): Promise<Response> {
	const res = await fetch(BASE_URL + url, options);
	if (res.ok) return res;
	const json: IFeedlyError = await res.json().catch(() => throwErr(res.status));
	if (!json.errorCode) throwErr(res.status);
	throw Error(`Feedly API Error ${json.errorCode}: ${json.errorMessage}`);
}

export async function fetchRes(url: string, options: RequestInit = {}): Promise<Response> {
	const accessToken = await getAccessToken();
	const mergedOptions: RequestInit = {
		...options,
		headers: {
			...options.headers,
			Authorization: `Bearer ${accessToken}`,
		},
	};

	return makeRequestFetch(url, mergedOptions).catch(async (error) => {
		if (error.message.includes('Feedly API Error 401')) {
			await refreshAccessToken();
			return makeRequestFetch(url, options);
		}
		throw error;
	});
}

export async function fetchJSON<T extends {}>(url: string, options: RequestInit = {}) {
	const res = await fetchRes(url, options);
	const json: T = await res.json();
	return json;
}
