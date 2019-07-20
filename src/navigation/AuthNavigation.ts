import { createStackNavigator, createAppContainer,
	createDrawerNavigator, NavigationScreenProps } from 'react-navigation';

import { navOpts } from './common';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ArticleScreen from '../screens/ArticleScreen/ArticleScreen';

const HomeStack = createStackNavigator({
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
		navigationOptions: ({ navigation }: NavigationScreenProps) => {
			return navOpts(navigation);
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

const AuthNavigator = createDrawerNavigator({
	Home: HomeStack,
	Settings: SettingsStack,
});

const AuthNavigationContainer = createAppContainer(AuthNavigator);
export default AuthNavigationContainer;
