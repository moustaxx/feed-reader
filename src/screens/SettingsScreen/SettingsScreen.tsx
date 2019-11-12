import React from 'react';
import { View } from 'react-native';
import { Switch, Subheading, Title, Snackbar, Button } from 'react-native-paper';
import { ScrollView } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';

import settingsStyles from './SettingsScreen.style';
import logout from '../../API/logout';
import { IAppState, ISettingsState } from '../../store/types';
import { setSettings, resetSettings } from '../../store/settings/settings.actions';
import { resetSecureStore } from '../../store/secure/secure.actions';

const SettingsScreen = () => {
	const mounted = React.useRef(true);
	const [snackBarData, setSnackbarData] = React.useState({ visibility: false, content: '' });

	const dispatch = useDispatch();
	const settings = useSelector((state: IAppState) => state.settings);

	const saveSettings = (newSettings: Partial<ISettingsState>) => {
		dispatch(setSettings(newSettings));
		if (mounted.current) setSnackbarData({ visibility: true, content: 'Settings saved.' });
	};

	const handleLogout = async () => {
		await logout().catch((err) => {
			console.warn('Log out error!', err);
			if (mounted.current) setSnackbarData({ visibility: true, content: 'Log out error!' });
		});
		dispatch(resetSecureStore());
	};

	React.useEffect(() => {
		return () => { mounted.current = false; }; // Set mounted as false on unmount
	}, []);

	return (
		<View style={settingsStyles.root}>
			<ScrollView>
				<Title>Article list</Title>
				<View style={settingsStyles.option}>
					<Subheading>Picture on left</Subheading>
					<Switch
						value={settings.articlePictureOnLeft}
						onValueChange={() => saveSettings({
							articlePictureOnLeft: !settings.articlePictureOnLeft,
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
				<View style={settingsStyles.option}>
					<Button
						compact
						children="Reset settings"
						mode="contained"
						onPress={() => dispatch(resetSettings())}
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
