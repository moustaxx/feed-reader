import React from 'react';
import { View, ScrollView } from 'react-native';
import { Switch, Subheading, Title, Button } from 'react-native-paper';
import settingsStyles from './SettingsScreen.style';
import { SettingsContext, ISettings } from '../../utils/useSettings';

const SettingsScreen = () => {
	const [settings, setSettings] = React.useContext(SettingsContext);

	const [optimistic, setOptimistic] = React.useState(settings);
	const changeOptimistic = (newOptimistic: Partial<ISettings>) => (
		setOptimistic({ ...optimistic, ...newOptimistic })
	);

	const saveData = () => setSettings(optimistic);

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
			<Button
				onPress={saveData}
				mode="contained"
				children="Save"
			/>
		</View>
	);
};

export default SettingsScreen;
