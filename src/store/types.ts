import { IArticle } from '../components/ArticleItem/ArticleItem';

export type IArticlesState = Readonly<{
	error: string | null;
	isLoading: boolean;
	articles: ReadonlyArray<IArticle>;
}>;

export type ISettingsState = Readonly<{
	articlePictureOnLeft: boolean;
}>;

export interface IAppState {
	articles: IArticlesState;
	settings: ISettingsState;
}
