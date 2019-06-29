import React from 'react';
import { ACCESS_TOKEN } from '../../.env';

interface IState<T> {
	data: T | null;
	loading: boolean;
	error: Error | null;
}

interface IFeedlyError {
	errorCode: number;
	errorMessage?: string;
	errorId?: string;
}

const defaultOptions = {
	headers: {
		Authorization: `OAuth ${ACCESS_TOKEN}`,
	},
};

function useFetch<T extends {}>(url: string, options?: RequestInit): IState<T> {
	const [state, setState] = React.useState<IState<T>>({
		data: null,
		loading: false,
		error: null,
	});

	const mergedOptions = { ...defaultOptions, options };

	const handleFetch = async () => {
		setState(({ ...state, loading: true }));
		try {
			const res = await fetch(url, mergedOptions);
			const json: T & IFeedlyError = await res.json();
			if (!res.ok) {
				if (json.errorCode) {
					throw Error(`Feedly API Error ${json.errorCode}: ${json.errorMessage}`);
				}
				throw Error(`Error ${res.status}: Response is not ok.`);
			}
			setState({
				data: json,
				loading: false,
				error: null,
			});
		} catch (err) {
			console.warn(err);
			setState({
				data: null,
				loading: false,
				error: err,
			});
		}
		return true;
	};

	React.useEffect(() => {
		handleFetch();
	}, [url, setState]);
	return state;
}

export default useFetch;
