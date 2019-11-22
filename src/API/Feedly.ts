import withQuery from 'with-query';

import makeRequestFetch from './feedlyFetch';
import { IGetArticles, IGetArticlesOptions } from './getArticles';
import { IGetTokensRes, IGetTokensInput } from './getTokens';
import { IProfile } from './getUserProfile';
import { IRefreshAccessTokenInput, IRefreshAccessTokenResponse } from './refreshAccessToken';

interface IOptions {
	baseURL: string;
	clientID: string;
	clientSecret: string;
	redirectURI: string;
}

export interface ITokens {
	accessToken: string | null;
	refreshToken: string | null;
}

interface IAuthData {
	userID: string;
	accessToken: string;
	refreshToken: string;
}

class Feedly {
	public userID?: string;

	private tokens: ITokens = {
		accessToken: null,
		refreshToken: null,
	};

	private options: IOptions;

	constructor(options: IOptions) {
		this.options = {
			baseURL: options.baseURL,
			clientID: options.clientID,
			clientSecret: options.clientSecret,
			redirectURI: options.redirectURI,
		};
	}

	private async feedlyFetch(
		url: string,
		options: RequestInit = {},
		noAuth = false,
	) {
		if (noAuth === true) return makeRequestFetch(url, options, this.options.baseURL);
		if (!this.tokens.accessToken) throw Error('You must be logged in!');

		const mergedOptions: RequestInit = {
			...options,
			headers: {
				...options.headers,
				Authorization: `Bearer ${this.tokens.accessToken}`,
			},
		};
		return makeRequestFetch(url, mergedOptions, this.options.baseURL);
	}

	private async feedlyFetchJSON<T extends {}>(
		url: string,
		options: RequestInit = {},
		noAuth?: boolean,
	) {
		const res = await this.feedlyFetch(url, options, noAuth);
		const json: T = await res.json();
		return json;
	}

	public checkIfLoggedIn = () => {
		if (this.tokens.accessToken && this.tokens.refreshToken) return true;
		return false;
	};

	public getArticles = (options: IGetArticlesOptions) => {
		const reqURL = withQuery('/v3/streams/contents/', options);
		return this.feedlyFetchJSON<IGetArticles>(reqURL);
	};

	/** Get tokens using code from received URL */
	public getTokens = (code: string) => {
		const reqURL = withQuery<IGetTokensInput>('/v3/auth/token', {
			code,
			client_id: this.options.clientID,
			client_secret: this.options.clientSecret,
			redirect_uri: encodeURI(this.options.redirectURI),
			grant_type: 'authorization_code',
		});
		return this.feedlyFetchJSON<IGetTokensRes>(reqURL, { method: 'POST' }, true);
	};

	public getUserProfile = () => this.feedlyFetchJSON<IProfile>('/v3/profile');

	public restoreAuthData = (authData: IAuthData) => {
		const { userID, accessToken, refreshToken } = authData;
		this.userID = userID;
		this.tokens = {
			accessToken,
			refreshToken,
		};
	};

	public logout = () => this.feedlyFetch('/v3/auth/logout', { method: 'POST' });

	public markAllAsRead = () => {
		return this.feedlyFetch('/v3/markers', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				action: 'markAsRead',
				type: 'categories',
				categoryIds: [`user/${this.userID}/category/global.all`],
				asOf: Date.now(),
			}),
		});
	};

	public markOneAsRead = (entryID: string) => {
		return this.feedlyFetch('/v3/markers', {
			method: 'POST',
			body: JSON.stringify({
				action: 'markAsRead',
				type: 'entries',
				entryIds: [entryID],
			}),
		});
	};

	public refreshAccessToken = () => {
		const reqURL = withQuery<IRefreshAccessTokenInput>('/v3/auth/token', {
			refresh_token: this.tokens.refreshToken,
			client_id: this.options.clientID,
			client_secret: this.options.clientSecret,
			grant_type: 'refresh_token',
		});
		return this.feedlyFetchJSON<IRefreshAccessTokenResponse>(reqURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	};
}

export default Feedly;
