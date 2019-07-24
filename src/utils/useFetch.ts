import React from 'react';
import { fetchJSON } from './myFetch';

interface IState<T> {
	data: T | null;
	loading: boolean;
	error: Error | null;
}

function useFetch<T extends {}>(url: string, options: RequestInit = {}): IState<T> {
	const [state, setState] = React.useState<IState<T>>({
		data: null,
		loading: false,
		error: null,
	});

	const handleFetch = async () => {
		setState(({ ...state, loading: true }));
		try {
			const json = await fetchJSON<T>(url, options);
			setState({
				data: json,
				loading: false,
				error: null,
			});
		} catch (err) {
			setState({
				data: null,
				loading: false,
				error: err,
			});
		}
	};

	React.useEffect(() => {
		handleFetch();
	}, [url, setState]);
	return state;
}

export default useFetch;
