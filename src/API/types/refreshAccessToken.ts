export interface IRefreshAccessTokenInput {
	/** The refresh token returned in the previous code. */
	refresh_token: string | null;
	/** The clientId obtained during application registration. */
	client_id: string;
	/** The client secret obtained during application registration. */
	client_secret: string;
	/** As defined in the OAuth2 specification, this field must be set to refresh_token */
	grant_type: 'refresh_token';
}

export interface IRefreshAccessTokenResponse {
	/** The feedly user id */
	id: string;
	/** The new access token */
	access_token: string;
	/** The remaining lifetime on the access token in seconds */
	expires_in: number;
	/** Indicates the type of token returned.
	 * At this time, this field will always have the value Bearer */
	token_type: string;
	/** Indicated the user plan (standard, pro or business) */
	plan: 'standard' | 'pro' | 'business';
}
