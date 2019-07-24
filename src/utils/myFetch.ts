import * as SecureStore from 'expo-secure-store';

export interface IFeedlyError {
	errorCode: number;
	errorMessage?: string;
	errorId?: string;
}

export const getAccessToken = async () => {
	const token = await SecureStore.getItemAsync('accessToken');
	return token;
};

export async function fetchRes(url: string, options: RequestInit = {}) {
	const mergedOptions: RequestInit = {
		...options,
		headers: {
			...options.headers,
			Authorization: `Bearer ${await getAccessToken()}`,
		},
	};
	const res = await fetch(url, mergedOptions).catch(err => { throw Error(err); });
	if (!res.ok) {
		const throwErr = () => {
			throw Error(`Error ${res.status}: Response is not ok.`);
		};
		const json: IFeedlyError = await res.json().catch(() => throwErr());
		if (json.errorCode) {
			throw Error(`Feedly API Error ${json.errorCode}: ${json.errorMessage}`);
		}
		throwErr();
	}
	return res;
}

export async function fetchJSON<T extends {}>(url: string, options: RequestInit = {}) {
	const res = await fetchRes(url, options);
	const json: T = await res.json();
	return json;
}
