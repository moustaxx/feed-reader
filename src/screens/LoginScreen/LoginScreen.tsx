/* eslint-disable @typescript-eslint/camelcase */

import React from 'react';
import withQuery from 'with-query';
import { View, WebView, AsyncStorage } from 'react-native';
import { Text } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import URLParse from 'url-parse';

import loginScreenStyles from './LoginScreen.style';
import { AuthContext } from '../../contexts/AuthContext';

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

interface IGetAuthCodeInput {
	/** Indicates the type of token requested.
	At this time, this field will always have the value code */
	response_type: string;
	/** Indicates the client that is making the request.The value passed in this
	 * parameter must exactly match the value set during the partnership program. */
	client_id: string;
	/** Determines where the response is sent.
	 *
	 * The value of this parameter must exactly match one of the values set during
	 * the partnership program (including case, and trailing ‘/’).
	 * If it is a URL, it must use HTTPS. Make sure this parameter is URL-encoded!
	 *
	 * On sandbox, the default list includes "http://localhost",
	 * "http://localhost:8080" and "urn:ietf:wg:oauth:2.0:oob". */
	redirect_uri: string;
	/** Only `https://cloud.feedly.com/subscriptions` is supported. */
	scope: string;
	/** Indicates any state which may be useful to your application upon receipt
	 * of the response. The feedly Authorization Server roundtrips this parameter,
	 * so your application receives the same value it sent. Possible uses include
	 * redirecting the user to the correct resource in your site, nonces, and
	 * cross-site-request-forgery mitigations. Make sure this parameter is URL-encoded! */
	state?: string;
}

interface IGetTokenInput {
	/** The code returned from the previous call */
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

const authUrl = withQuery<IGetAuthCodeInput>('http://sandbox7.feedly.com/v3/auth/auth', {
	response_type: 'code',
	client_id: 'sandbox',
	redirect_uri: encodeURI('urn:ietf:wg:oauth:2.0:oob'),
	scope: encodeURI('https://cloud.feedly.com/subscriptions'),
});

interface IParsedQS extends URLParse {
	query: {
		code?: string;
		error?: string;
	};
}

const saveData = async (accessToken: string, refreshToken: string, userID: string) => {
	await Promise.all([
		SecureStore.setItemAsync('accessToken', accessToken),
		SecureStore.setItemAsync('refreshToken', refreshToken),
		AsyncStorage.setItem('userID', userID),
	]).catch(err => console.warn('UserID or tokens can not be saved in Storage!', err));
};

const LoginScreen = () => {
	const [authError, setAuthError] = React.useState<string>();
	const [, setAuthData] = React.useContext(AuthContext);
	let mounted = true;

	React.useEffect(() => {
		return () => {
			mounted = false;
		};
	}, []);

	const getToken = async (code: string) => {
		// Get tokens using code from received URL
		const getTokenUrl = withQuery<IGetTokenInput>('http://sandbox7.feedly.com/v3/auth/token', {
			code,
			client_id: 'sandbox',
			client_secret: 'YamL84gadHERJNcQ',
			redirect_uri: encodeURI('urn:ietf:wg:oauth:2.0:oob'),
			grant_type: 'authorization_code',
		});
		const data = await fetch(getTokenUrl, { method: 'POST' }).catch((err) => {
			console.warn('Can not get token!', err);
			setAuthError('Can not get token!');
		});
		if (!data || !data.ok) return;
		const json: IGetTokenRes = await data.json();
		await saveData(json.access_token, json.refresh_token, json.id);
		if (mounted) setAuthData({ status: 'LOGGED_IN', userID: json.id });
	};

	const handleAuth = (url?: string) => {
		if (!url) return;
		const { query }: IParsedQS = URLParse(url, true);
		if (!query.code) {
			if (query.error) setAuthError(query.error);
			return;
		}
		getToken(query.code);
	};

	return (
		<View style={loginScreenStyles.root}>
			{authError ? (<Text>{authError}</Text>) : (
				<WebView
					source={{ uri: authUrl }}
					onNavigationStateChange={navEvent => handleAuth(navEvent.url)}
				/>
			)}
		</View>
	);
};

export default LoginScreen;
