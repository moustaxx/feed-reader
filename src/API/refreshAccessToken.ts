import withQuery from 'with-query';

import { CLIENT_ID, CLIENT_SECRET, BASE_URL } from '../../config';
import { store } from '../store';
import { setAuthData } from '../store/secure/secure.actions';

interface IInput {
	/** The refresh token returned in the previous code. */
	refresh_token: string | null;
	/** The clientId obtained during application registration. */
	client_id: string;
	/** The client secret obtained during application registration. */
	client_secret: string;
	/** As defined in the OAuth2 specification, this field must be set to refresh_token */
	grant_type: 'refresh_token';
}

interface IResponse {
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

const refreshAccessToken = async () => {
	const { refreshToken } = store.getState().secure;
	const getTokenUrl = withQuery<IInput>('/v3/auth/token', {
		refresh_token: refreshToken,
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		grant_type: 'refresh_token',
	});
	const res = await fetch(BASE_URL + getTokenUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data: IResponse = await res.json();
	store.dispatch(setAuthData({ accessToken: data.access_token }));
	return data;
};

export default refreshAccessToken;
