import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import innertext from 'innertext';
import { format } from 'timeago.js';

import { IAppState, IArticle } from '../types';
import { makeRequest, feedly } from '../../utils/feedlyClient';

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

export const switchArticleReadStatus = (articleID: string) => {
	return {
		type: 'SWITCH_ARTICLE_READ_STATUS',
		payload: {
			articleID,
		},
	} as const;
};

export const switchArticleSaveStatus = (entryIds: string[]) => {
	return {
		type: 'SWITCH_ARTICLE_SAVE_STATUS',
		payload: {
			entryIds,
		},
	} as const;
};

export const markAllArticlesAsRead = () => {
	return {
		type: 'MARK_ALL_ARTICLES_AS_READ',
	} as const;
};

export const articlesFetchData = (): ThunkAction<void, IAppState, null, Action<string>> => {
	return async (dispatch, getState) => {
		dispatch(articlesIsLoading(true));
		try {
			const { userID } = getState().secure;

			const data = await makeRequest(() => feedly.getArticles({
				streamId: encodeURI(`user/${userID}/category/global.all`),
				count: 20,
				unreadOnly: false,
				ranked: 'newest',
			}));

			const articles = data.items.map((article) => {
				const { tags } = article;
				const { content } = article.summary || article.content || {} as any;
				const saved = tags ? !!tags.some(({ id }) => id.endsWith('global.saved')) : false;

				return {
					id: article.id,
					title: article.title,
					content: content && innertext(content),
					unread: article.unread,
					thumbnail: article.thumbnail && article.thumbnail[0].url,
					imageURL: article.visual?.url !== 'none' ? article.visual?.url : undefined,
					targetURL: article.alternate?.[0].href,
					sourceName: article.origin?.title || 'Unknown',
					engagement: article.engagement || 0,
					crawled: format(article.crawled, 'my-locale'),
					tags: article.tags,
					saved,
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
