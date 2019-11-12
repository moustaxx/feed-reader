import withQuery from 'with-query';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '../../config';
import { fetchJSON } from '../utils/myFetch';

interface IGetTokenRes {
	/** The feedly user id */
	id: string;
	/** A token that may be used to access APIs. Access tokens are have an expiration */
	access_token: string;
	/** A token that may be used to obtain a new access token.
	 *  Refresh tokens are valid until the user revokes access. */
	refresh_token: string;
	/** The remaining lifetime on the access token in seconds */
	expires_in: number;
	/** Indicates the type of token returned. At this time,
	 *  this field will always have the value of Bearer */
	token_type: string;
	/** Indicated the user plan (standard, pro or business) */
	plan: string;
	/** The state that was passed in */
	state?: string;
}
interface IGetTokenInput {
	/** The code returned on successful authorization */
	code: string;
	/** The clientId obtained during application registration */
	client_id: string;
	/** The client secret obtained during application registration */
	client_secret: string;
	/** The URI registered with the application
	 * (if you pass it as a URL parameter, be sure to URL-encode it!) */
	redirect_uri: string;
	/** Only `https://cloud.feedly.com/subscriptions` is supported. */
	state?: string;
	/** As defined in the OAuth2 specification, this field must be set to `authorization_code` */
	grant_type: string;
}

/** Get tokens using code from received URL */
const getTokens = async (code: string) => {
	const getTokenUrl = withQuery<IGetTokenInput>('/v3/auth/token', {
		code,
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		redirect_uri: encodeURI(REDIRECT_URI),
		grant_type: 'authorization_code',
	});
	const data = await fetchJSON<IGetTokenRes>(getTokenUrl, { method: 'POST' });
	return data;
};

export default getTokens;
