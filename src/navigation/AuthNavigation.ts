import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator, NavigationStackScreenProps } from 'react-navigation-stack';

import { navOpts } from './common';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ArticleScreen from '../screens/ArticleScreen/ArticleScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import MenuDrawer from './MenuDrawer/MenuDrawer';

const HomeStack = createStackNavigator({
	HomeScreen,
	ArticleScreen,
}, { initialRouteName: 'HomeScreen' });

const SettingsStack = createStackNavigator({
	Settings: {
		screen: SettingsScreen,
		navigationOptions: ({ navigation }: NavigationStackScreenProps) => {
			const opts = navOpts(navigation);
			return {
				title: 'Settings',
				...opts,
			};
		},
	},
}, { initialRouteName: 'Settings' });

const MyProfileStack = createStackNavigator({
	MyProfile: {
		screen: ProfileScreen,
		navigationOptions: ({ navigation }: NavigationStackScreenProps) => {
			const opts = navOpts(navigation);
			return {
				title: 'My profile',
				...opts,
			};
		},
	},
}, { initialRouteName: 'MyProfile' });

const AuthNavigator = createDrawerNavigator({
	Home: HomeStack,
	Settings: SettingsStack,
	'My Profile': MyProfileStack,
}, { contentComponent: MenuDrawer });

const AuthNavigationContainer = createAppContainer(AuthNavigator);
export default AuthNavigationContainer;
