import { createAppContainer,
	NavigationScreenProps } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import { navOpts } from './common';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ArticleScreen from '../screens/ArticleScreen/ArticleScreen';
import MenuDrawer from './MenuDrawer/MenuDrawer';

const HomeStack = createStackNavigator({
	HomeScreen,
	ArticleScreen,
}, { initialRouteName: 'HomeScreen' });

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
}, { contentComponent: MenuDrawer });

const AuthNavigationContainer = createAppContainer(AuthNavigator);
export default AuthNavigationContainer;
