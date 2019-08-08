import React from 'react';
import { View } from 'react-native';
import { Switch, Subheading, Title, Snackbar, Button } from 'react-native-paper';
import { ScrollView } from 'react-navigation';

import settingsStyles from './SettingsScreen.style';
import { SettingsContext, ISettings } from '../../utils/useSettings';
import { AuthContext } from '../../contexts/AuthContext';
import logout from '../../API/logout';

const SettingsScreen = () => {
	const mounted = React.useRef(true);
	const [settings, setSettings] = React.useContext(SettingsContext);
	const [, setAuthData] = React.useContext(AuthContext);

	const [snackBarData, setSnackbarData] = React.useState({ visibility: false, content: '' });
	const [optimistic, setOptimistic] = React.useState(settings);

	const changeOptimistic = (newOptimistic: Partial<ISettings>) => (
		setOptimistic({ ...optimistic, ...newOptimistic })
	);

	const saveSettings = React.useCallback(() => {
		setSettings(optimistic);
		setSnackbarData({ visibility: true, content: 'Settings saved.' });
	}, [optimistic, setSettings]);

	React.useEffect(() => { // Saves settings
		return () => saveSettings();
	}, [saveSettings, optimistic]);

	React.useEffect(() => {
		return () => {
			mounted.current = false;
		};
	}, []);

	const handleLogout = async () => {
		await logout().catch(err => {
			console.warn('Log out error!', err);
			if (mounted.current) setSnackbarData({ visibility: true, content: 'Log out error!' });
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
						onPress={handleLogout}
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
