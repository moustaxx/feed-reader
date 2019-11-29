import { articlesHasErrored, articlesIsLoading, articlesFetchDataSuccess, markArticleAsRead } from './articles.actions';
import { IArticlesState } from '../types';

type TAction =
	| ReturnType<typeof articlesHasErrored>
	| ReturnType<typeof articlesIsLoading>
	| ReturnType<typeof articlesFetchDataSuccess>
	| ReturnType<typeof markArticleAsRead>;

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
			case 'MARK_ARTICLE_AS_READ': {
				const articles = state.articles.map((article) => {
					if (article.id !== action.payload.articleID) return article;
					return {
						...article,
						unread: false,
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
