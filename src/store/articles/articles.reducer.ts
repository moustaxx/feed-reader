import { articlesHasErrored, articlesIsLoading, articlesFetchDataSuccess } from './articles.actions';
import { IGetArticlesItem } from '../../API/useGetArticles';

type TAction =
	| ReturnType<typeof articlesHasErrored>
	| ReturnType<typeof articlesIsLoading>
	| ReturnType<typeof articlesFetchDataSuccess>;

type IState = Readonly<{
	error: string | null;
	isLoading: boolean;
	items: ReadonlyArray<IGetArticlesItem>;
}>;

const initialState: IState = {
	error: null,
	isLoading: false,
	items: [],
};

const articlesReducer = (state = initialState, action: TAction): IState => {
	try {
		switch (action.type) {
			case 'ITEMS_HAS_ERRORED':
			case 'ITEMS_IS_LOADING':
				return {
					...state,
					...action.payload,
				};
			case 'ITEMS_FETCH_DATA_SUCCESS':
				return {
					...state,
					items: [
						...state.items,
						...action.payload.items,
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
