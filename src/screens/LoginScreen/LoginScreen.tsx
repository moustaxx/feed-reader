import React from 'react';
import { View, WebView } from 'react-native';
import { Text } from 'react-native-paper';
import URLParse from 'url-parse';
import { useDispatch } from 'react-redux';

import loginScreenStyles from './LoginScreen.style';
import { setAuthData } from '../../store/secure/secure.actions';
import { makeRequest, feedly } from '../../utils/feedlyClient';

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
		return () => { mounted.current = false; };
	}, []);

	const handleAuth = async (url?: string) => {
		if (!url) return;
		const { query }: IParsedQS = URLParse(url, true);
		const code = query?.code;
		if (!code) {
			if (query.error && mounted.current) setAuthError(query.error);
			return;
		}
		try {
			const tokens = await makeRequest(() => feedly.getTokens(code));
			if (!tokens) return;
			feedly.restoreAuthData({
				userID: tokens.id,
				accessToken: tokens.access_token,
				refreshToken: tokens.refresh_token,
			});
			dispatch(setAuthData({
				refreshToken: tokens.refresh_token,
				accessToken: tokens.access_token,
				userID: tokens.id,
			}));
		} catch (error) {
			console.error(error);
			if (mounted.current) setAuthError('Can not get tokens!');
		}
	};

	const authUrl = feedly.getOAuthLoginURL();

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
