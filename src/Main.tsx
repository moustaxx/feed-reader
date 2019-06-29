import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { IconButton } from 'react-native-paper';

import './registerLocale';
import mainStyles from './Main.style';
import SettingsScreen from './screens/SettingsScreen';
import HomeScreen from './screens/HomeScreen';
import ArticleScreen from './screens/ArticleScreen';

const Main = () => {
	return (
		<NavigationContainer />
	);
};

const navOpts = {
	headerRight: <IconButton
		onPress={() => alert('This is a button!')}
		style={mainStyles.menu}
		icon="menu"
		color="#fff"
	/>,
	headerStyle: mainStyles.header,
	headerTitleStyle: mainStyles.headerTitle,
	headerTintColor: '#fff',
};

const RootStack = createStackNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: {
			title: 'Feed Reader',
			...navOpts,
		},
	},
	ArticleScreen: {
		screen: ArticleScreen,
		navigationOptions: {
			title: 'Article',
			...navOpts,
		},
	},
	Settings: {
		screen: SettingsScreen,
		navigationOptions: {
			title: 'Settings',
			...navOpts,
		},
	},
}, { initialRouteName: 'Home' });

const NavigationContainer = createAppContainer(RootStack);

export default Main;
