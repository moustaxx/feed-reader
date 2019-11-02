import { Dispatch } from 'redux';
import withQuery from 'with-query';

import { fetchJSON } from '../../utils/myFetch';
import { IGetArticles, IGetArticlesItem } from '../../API/useGetArticles';

export const articlesHasErrored = (error: string) => {
	return {
		type: 'ITEMS_HAS_ERRORED',
		payload: {
			error,
		},
	} as const;
};

export const articlesIsLoading = (isLoading: boolean) => {
	return {
		type: 'ITEMS_IS_LOADING',
		payload: {
			isLoading,
		},
	} as const;
};

export const articlesFetchDataSuccess = (items: IGetArticlesItem[]) => {
	return {
		type: 'ITEMS_FETCH_DATA_SUCCESS',
		payload: {
			items,
		},
	} as const;
};

export const articlesFetchData = () => async (dispatch: Dispatch) => {
	dispatch(articlesIsLoading(true));
	try {
		const reqURL = withQuery('/v3/streams/contents/', {
			streamId: encodeURI('feed/http://www.independent.co.uk/news/rss'),
			count: 20,
			unreadOnly: true,
			ranked: 'newest',
		});

		const data = await fetchJSON<IGetArticles>(reqURL);

		dispatch(articlesIsLoading(false));
		dispatch(articlesFetchDataSuccess(data.items));
	} catch (error) {
		console.error(error);
		dispatch(articlesIsLoading(false));
		dispatch(articlesHasErrored(error.message));
	}
};
