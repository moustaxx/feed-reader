import { IArticle } from '../components/ArticleItem/ArticleItem';

export type IArticlesState = Readonly<{
	error: string | null;
	isLoading: boolean;
	articles: ReadonlyArray<IArticle>;
}>;

export interface IAppState {
	articles: IArticlesState;
}
