import React from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator, NavigationScreenProps, NavigationScreenProp } from 'react-navigation';
import { IconButton } from 'react-native-paper';

import './registerLocale';
import mainStyles from './Main.style';
import SettingsScreen from './screens/SettingsScreen/SettingsScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ArticleScreen from './screens/ArticleScreen/ArticleScreen';

const Main = () => {
	return (
		<NavigationContainer />
	);
};

const headerStyles = {
	headerStyle: mainStyles.header,
	headerTitleStyle: mainStyles.headerTitle,
	headerTintColor: '#fff',
};

const navOpts = (navigation: NavigationScreenProp<{}>) => ({
	headerLeft: <IconButton
		onPress={() => navigation.toggleDrawer()}
		style={mainStyles.menu}
		icon="menu"
		color="#fff"
	/>,
	...headerStyles,
});

const RootStack = createStackNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: ({ navigation }: NavigationScreenProps) => {
			const opts = navOpts(navigation);
			return {
				title: 'Feed Reader',
				...opts,
			};
		},
	},
	ArticleScreen: {
		screen: ArticleScreen,
		navigationOptions: {
			title: 'Article',
			...headerStyles,
		},
	},
}, { initialRouteName: 'Home' });

const SettingsStack = createStackNavigator({
	Settings: {
		screen: SettingsScreen,
		navigationOptions: ({ navigation }: NavigationScreenProps) => {
			const opts = navOpts(navigation);
			return {
				title: 'Settings',
				...opts,
			};
		},
	},
}, { initialRouteName: 'Settings' });

const MyDrawerNavigator = createDrawerNavigator({
	Home: {
		screen: RootStack,
	},
	Settings: {
		screen: SettingsStack,
	},
});

const NavigationContainer = createAppContainer(MyDrawerNavigator);

export default Main;
