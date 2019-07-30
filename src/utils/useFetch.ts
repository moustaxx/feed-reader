import React from 'react';
import { fetchJSON } from './myFetch';

interface IState<T> {
	data: T | null;
	loading: boolean;
	error: Error | null;
	refetch: () => void;
}

function useFetch<T extends {}>(url: string, options: RequestInit = {}): IState<T> {
	const [state, setState] = React.useState<IState<T>>({
		data: null,
		loading: false,
		error: null,
		refetch: () => handleFetch(), // eslint-disable-line @typescript-eslint/no-use-before-define
	});

	const handleFetch = React.useCallback(async () => {
		setState(({ ...state, loading: true }));
		try {
			const json = await fetchJSON<T>(url, options);
			setState({
				...state,
				data: json,
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

export default useFetch;
