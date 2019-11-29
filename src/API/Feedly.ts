import withQuery from 'with-query';

import makeRequestFetch from './feedlyFetch';
import { IGetArticles, IGetArticlesOptions } from './types/getArticles';
import { IGetTokensRes, IGetTokensInput } from './types/getTokens';
import { IProfile } from './types/getUserProfile';
import { IRefreshAccessTokenInput, IRefreshAccessTokenResponse } from './types/refreshAccessToken';
import { IGetOAuthLoginInput } from './types/getOAuthLogin';

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

	/** This method is not API request */
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

	/**
	 * Method that allows you to pass persisted auth data
	 *
	 * This method is not API request
	 */
	public restoreAuthData = (authData: IAuthData) => {
		const { userID, accessToken, refreshToken } = authData;
		this.userID = userID;
		this.tokens = {
			accessToken,
			refreshToken,
		};
	};

	/**
	 * Returns URL to feedly OAuth login site
	 *
	 * This method is not API request
	 */
	public getOAuthLoginURL = () => {
		return withQuery<IGetOAuthLoginInput>(`${this.options.baseURL}/v3/auth/auth`, {
			response_type: 'code',
			client_id: this.options.clientID,
			redirect_uri: encodeURI(this.options.redirectURI),
			scope: encodeURI('https://cloud.feedly.com/subscriptions'),
		});
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

	public setReadStatus = (entryID: string, hasBeenRead: boolean) => {
		const action = hasBeenRead ? 'markAsRead' : 'keepUnread';
		return this.feedlyFetch('/v3/markers', {
			method: 'POST',
			body: JSON.stringify({
				action,
				type: 'entries',
				entryIds: [entryID],
			}),
		});
	};

	public refreshAccessToken = async () => {
		const reqURL = withQuery<IRefreshAccessTokenInput>('/v3/auth/token', {
			refresh_token: this.tokens.refreshToken,
			client_id: this.options.clientID,
			client_secret: this.options.clientSecret,
			grant_type: 'refresh_token',
		});
		const data = await this.feedlyFetchJSON<IRefreshAccessTokenResponse>(reqURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		this.tokens = { ...this.tokens, accessToken: data.access_token };
	};
}

export default Feedly;
