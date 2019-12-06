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
	tags?: {
		id: string;
		label?: string;
		description?: string;
	}[];
	saved: boolean;
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

export type ISecureState = Readonly<{
	refreshToken: string | null;
	accessToken: string | null;
	userID: string | null;
}>;

export interface IAppState {
	articles: IArticlesState;
	settings: ISettingsState;
	secure: ISecureState;
}
