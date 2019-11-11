export interface IArticle {
	id: string;
	title?: string;
	content: string;
	unread: boolean;
	thumbnail?: string;
	imageURL?: string;
	targetURL?: string;
	sourceName: string;
	engagement: number;
	crawled: string;
}

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
