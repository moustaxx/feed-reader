import React from 'react';

import Feedly from '../API/Feedly';
import { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, BASE_URL } from '../../config';

export const feedly = new Feedly({
	baseURL: BASE_URL,
	clientID: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	redirectURI: REDIRECT_URI,
});

export async function makeRequest<T>(apiMethod: () => T) {
	try {
		return apiMethod();
	} catch (error) {
		if (error.message.includes('Feedly API Error 401')) {
			await feedly.refreshAccessToken();
			return apiMethod();
		}
		throw Error(error);
	}
}

interface IState<T> {
	data: T | null;
	loading: boolean;
	error: Error | null;
	refetch: () => void;
}

export function useAPIRequest<T>(apiMethod: () => Promise<T>): IState<T> {
	const [state, setState] = React.useState<IState<T>>({
		data: null,
		loading: false,
		error: null,
		refetch: () => handleFetch(), // eslint-disable-line @typescript-eslint/no-use-before-define
	});

	const handleFetch = React.useCallback(async () => {
		setState((prevValue) => ({ ...prevValue, loading: true }));
		try {
			const data = await makeRequest(apiMethod);
			setState({
				...state,
				data,
				loading: false,
				error: null,
			});
		} catch (err) {
			setState({
				...state,
				data: null,
				loading: false,
				error: err,
			});
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	React.useEffect(() => {
		handleFetch();
	}, [handleFetch]);
	return state;
}
