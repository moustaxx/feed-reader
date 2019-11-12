import React from 'react';
import withQuery from 'with-query';
import { View, WebView } from 'react-native';
import { Text } from 'react-native-paper';
import URLParse from 'url-parse';
import { useDispatch } from 'react-redux';

import { REDIRECT_URI, CLIENT_ID, BASE_URL } from '../../../config';
import loginScreenStyles from './LoginScreen.style';
import getTokens from '../../API/getTokens';
import { setAuthData } from '../../store/secure/secure.actions';

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

const authUrl = withQuery<IGetAuthCodeInput>(`${BASE_URL}/v3/auth/auth`, {
	response_type: 'code',
	client_id: CLIENT_ID,
	redirect_uri: encodeURI(REDIRECT_URI),
	scope: encodeURI('https://cloud.feedly.com/subscriptions'),
});

interface IParsedQS extends URLParse {
	query: {
		code?: string;
		error?: string;
	};
}

const LoginScreen = () => {
	const [authError, setAuthError] = React.useState<string>();
	const mounted = React.useRef(true);
	const dispatch = useDispatch();
	React.useEffect(() => {
		return () => {
			mounted.current = false;
		};
	}, []);

	const handleAuth = async (url?: string) => {
		if (!url) return;
		const { query }: IParsedQS = URLParse(url, true);
		if (!query.code) {
			if (query.error) setAuthError(query.error);
			return;
		}
		const tokens = await getTokens(query.code).catch((err) => {
			setAuthError('Can not get tokens!');
			console.warn(err);
		});
		if (!tokens) return;
		dispatch(setAuthData({
			status: 'LOGGED_IN',
			refreshToken: tokens.refresh_token,
			accessToken: tokens.access_token,
			userID: tokens.id,
		}));
	};

	return (
		<View style={loginScreenStyles.root}>
			{authError ? (<Text style={loginScreenStyles.heading}>{authError}</Text>) : (
				<WebView
					source={{ uri: authUrl }}
					onNavigationStateChange={(navEvent) => handleAuth(navEvent.url)}
				/>
			)}
		</View>
	);
};

export default LoginScreen;
