import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Switch, Subheading, Title, Snackbar, Button } from 'react-native-paper';
import { ScrollView } from 'react-navigation';
import * as SecureStore from 'expo-secure-store';

import settingsStyles from './SettingsScreen.style';
import { SettingsContext, ISettings } from '../../utils/useSettings';
import { AuthContext } from '../../contexts/AuthContext';

const SettingsScreen = () => {
	let mounted = true;
	const [settings, setSettings] = React.useContext(SettingsContext);
	const [, setAuthData] = React.useContext(AuthContext);

	const [snackBarData, setSnackbarData] = React.useState({ visibility: false, content: '' });
	const [optimistic, setOptimistic] = React.useState(settings);

	const changeOptimistic = (newOptimistic: Partial<ISettings>) => (
		setOptimistic({ ...optimistic, ...newOptimistic })
	);

	const saveSettings = () => {
		setSettings(optimistic);
		setSnackbarData({ visibility: true, content: 'Settings saved.' });
	};

	React.useEffect(() => { // Saves settings
		return () => saveSettings();
	}, [optimistic]);

	React.useEffect(() => {
		return () => {
			mounted = false;
		};
	}, []);

	const logout = async () => {
		await Promise.all([
			fetch('http://sandbox7.feedly.com/v3/auth/logout', { method: 'POST' }),
			AsyncStorage.removeItem('userID'),
			SecureStore.deleteItemAsync('accessToken'),
			SecureStore.deleteItemAsync('refreshToken'),
		]).catch((err) => {
			console.warn('Log out error!', err);
			if (mounted) setSnackbarData({ visibility: true, content: 'Log out error!' });
		});
		setAuthData({ userID: null, status: 'LOGGED_OUT' });
	};

	return (
		<View style={settingsStyles.root}>
			<ScrollView>
				<Title>Article list</Title>
				<View style={settingsStyles.option}>
					<Subheading>Picture on left</Subheading>
					<Switch
						value={optimistic.articlePictureOnLeft}
						onValueChange={() => changeOptimistic({
							articlePictureOnLeft: !optimistic.articlePictureOnLeft,
						})}
					/>
				</View>
				<View style={settingsStyles.option}>
					<Button
						compact
						children="Log out"
						mode="contained"
						onPress={logout}
					/>
				</View>
			</ScrollView>
			<Snackbar
				visible={snackBarData.visibility}
				duration={2000}
				onDismiss={() => setSnackbarData({ ...snackBarData, visibility: false })}
				children={snackBarData.content}
			/>
		</View>
	);
};

export default SettingsScreen;
