import { articlesHasErrored, articlesIsLoading, articlesFetchDataSuccess, switchArticleReadStatus, markAllArticlesAsRead, switchArticleSaveStatus } from './articles.actions';
import { IArticlesState } from '../types';
import { makeRequest, feedly } from '../../utils/feedlyClient';

type TAction =
	| ReturnType<typeof articlesHasErrored>
	| ReturnType<typeof articlesIsLoading>
	| ReturnType<typeof articlesFetchDataSuccess>
	| ReturnType<typeof switchArticleReadStatus>
	| ReturnType<typeof switchArticleSaveStatus>
	| ReturnType<typeof markAllArticlesAsRead>;

const initialState: IArticlesState = {
	error: null,
	isLoading: false,
	articles: [],
};

const articlesReducer = (state = initialState, action: TAction): IArticlesState => {
	try {
		switch (action.type) {
			case 'ARTICLES_HAS_ERRORED':
			case 'ARTICLES_IS_LOADING':
				return {
					...state,
					...action.payload,
				};
			case 'ARTICLES_FETCH_DATA_SUCCESS':
				return {
					...state,
					articles: [
						// ...state.articles,
						...action.payload.articles,
					],
				};
			case 'SWITCH_ARTICLE_READ_STATUS': {
				const articles = state.articles.map((article) => {
					if (article.id !== action.payload.articleID) return article;
					if (article.unread) {
						makeRequest(() => feedly.setReadStatus(action.payload.articleID, true));
					} else makeRequest(() => feedly.setReadStatus(action.payload.articleID, false));
					return {
						...article,
						unread: !article.unread,
					};
				});
				return {
					...state,
					articles,
				};
			}
			case 'MARK_ALL_ARTICLES_AS_READ': {
				const ids = state.articles.map((article) => article.id);
				makeRequest(() => feedly.markMultipleAsRead(ids));
				return state;
			}
			case 'SWITCH_ARTICLE_SAVE_STATUS': {
				let unsave = false;
				const articles = state.articles.map((article) => {
					const entryIdsLength = action.payload.entryIds.length;
					for (let i = 0; i < entryIdsLength; i += 1) {
						if (article.id === action.payload.entryIds[i]) {
							if (article.saved) unsave = true;
							return {
								...article,
								saved: !article.saved,
							};
						}
					}
					return article;
				});
				makeRequest(() => (
					unsave
						? feedly.markAsUnsaved(action.payload.entryIds)
						: feedly.markAsSaved(action.payload.entryIds)
				));
				return {
					...state,
					articles,
				};
			}
			default:
				return state;
		}
	} catch (error) {
		console.error(error);
		return state;
	}
};

export default articlesReducer;
