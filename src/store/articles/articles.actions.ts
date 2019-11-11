import { ThunkAction } from 'redux-thunk';
import { Dispatch, Action } from 'redux';
import withQuery from 'with-query';
import innertext from 'innertext';
import { format } from 'timeago.js';

import { fetchJSON } from '../../utils/myFetch';
import { IGetArticles } from '../../API/useGetArticles';
import { IAppState, IArticle } from '../types';

export const articlesHasErrored = (error: string) => {
	return {
		type: 'ARTICLES_HAS_ERRORED',
		payload: {
			error,
		},
	} as const;
};

export const articlesIsLoading = (isLoading: boolean) => {
	return {
		type: 'ARTICLES_IS_LOADING',
		payload: {
			isLoading,
		},
	} as const;
};

export const articlesFetchDataSuccess = (articles: IArticle[]) => {
	return {
		type: 'ARTICLES_FETCH_DATA_SUCCESS',
		payload: {
			articles,
		},
	} as const;
};

export const articlesFetchData = (): ThunkAction<void, IAppState, null, Action<string>> => {
	return async (dispatch: Dispatch) => {
		dispatch(articlesIsLoading(true));
		try {
			const reqURL = withQuery('/v3/streams/contents/', {
				streamId: encodeURI('feed/http://www.independent.co.uk/news/rss'),
				count: 20,
				unreadOnly: true,
				ranked: 'newest',
			});

			const data = await fetchJSON<IGetArticles>(reqURL);
			const articles = data.items.map((_article) => {
				const { content } = _article.summary || _article.content || {} as any;
				return {
					id: _article.id,
					title: _article.title,
					content: content && innertext(content),
					unread: _article.unread,
					thumbnail: _article.thumbnail && _article.thumbnail[0].url,
					imageURL: _article.visual && _article.visual.url !== 'none' ? _article.visual.url : undefined,
					targetURL: _article.alternate && _article.alternate[0].href,
					sourceName: _article.origin ? _article.origin.title : 'Unknown',
					engagement: _article.engagement ? _article.engagement : 0,
					crawled: format(_article.crawled, 'my-locale'),
				};
			});

			dispatch(articlesIsLoading(false));
			dispatch(articlesFetchDataSuccess(articles));
		} catch (error) {
			console.error(error);
			dispatch(articlesIsLoading(false));
			dispatch(articlesHasErrored(error.message));
		}
	};
};
