import { articlesHasErrored, articlesIsLoading, articlesFetchDataSuccess, switchArticleReadStatus } from './articles.actions';
import { IArticlesState } from '../types';
import { makeRequest, feedly } from '../../utils/feedlyClient';

type TAction =
	| ReturnType<typeof articlesHasErrored>
	| ReturnType<typeof articlesIsLoading>
	| ReturnType<typeof articlesFetchDataSuccess>
	| ReturnType<typeof switchArticleReadStatus>;

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
			default:
				return state;
		}
	} catch (error) {
		console.error(error);
		return state;
	}
};

export default articlesReducer;
