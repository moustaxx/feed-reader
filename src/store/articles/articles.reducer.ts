import { articlesHasErrored, articlesIsLoading, articlesFetchDataSuccess } from './articles.actions';
import { IArticle } from '../../components/ArticleItem/ArticleItem';

type TAction =
	| ReturnType<typeof articlesHasErrored>
	| ReturnType<typeof articlesIsLoading>
	| ReturnType<typeof articlesFetchDataSuccess>;

export type IState = Readonly<{
	error: string | null;
	isLoading: boolean;
	articles: ReadonlyArray<IArticle>;
}>;

const initialState: IState = {
	error: null,
	isLoading: false,
	articles: [],
};

const articlesReducer = (state = initialState, action: TAction): IState => {
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
						...state.articles,
						...action.payload.articles,
					],
				};
			default:
				return state;
		}
	} catch (error) {
		console.error(error);
		return state;
	}
};

export default articlesReducer;
