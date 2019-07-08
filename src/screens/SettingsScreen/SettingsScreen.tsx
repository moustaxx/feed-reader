import React from 'react';
import { View, ScrollView } from 'react-native';
import { Switch, Subheading, Title, Snackbar } from 'react-native-paper';

import settingsStyles from './SettingsScreen.style';
import { SettingsContext, ISettings } from '../../utils/useSettings';

const SettingsScreen = () => {
	const [settings, setSettings] = React.useContext(SettingsContext);

	const [optimistic, setOptimistic] = React.useState(settings);
	const [snackbarVisible, setSnackbarVisibility] = React.useState(false);

	const changeOptimistic = (newOptimistic: Partial<ISettings>) => (
		setOptimistic({ ...optimistic, ...newOptimistic })
	);

	const saveSettings = () => {
		setSettings(optimistic);
		setSnackbarVisibility(true);
	};

	React.useEffect(() => { // Saves settings
		return () => saveSettings();
	}, [optimistic]);

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
			</ScrollView>
			<Snackbar
				visible={snackbarVisible}
				duration={2000}
				onDismiss={() => setSnackbarVisibility(false)}
				children="Settings saved."
			/>
		</View>
	);
};

export default SettingsScreen;
