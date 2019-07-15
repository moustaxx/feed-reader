import React from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator,
	NavigationScreenProps, NavigationScreenProp } from 'react-navigation';
import { IconButton } from 'react-native-paper';

import { AuthContext } from './contexts/AuthContext';
import SettingsScreen from './screens/SettingsScreen/SettingsScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ArticleScreen from './screens/ArticleScreen/ArticleScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';

const headerStyles = {
	headerStyle: {
		backgroundColor: 'blue',
	},
	headerTitleStyle: {
		color: '#fff',
	},
	headerTintColor: '#fff',
};

const navOpts = (navigation: NavigationScreenProp<{}>) => ({
	headerLeft: <IconButton
		onPress={() => navigation.toggleDrawer()}
		style={{ marginHorizontal: 16 }}
		color="#fff"
		icon="menu"
	/>,
	...headerStyles,
});

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
		navigationOptions: headerStyles,
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

const LoginStack = createStackNavigator({
	Login: {
		screen: LoginScreen,
		navigationOptions: {
			title: 'Login',
			...headerStyles,
		},
	},
}, { initialRouteName: 'Login' });

const AuthNavigator = createDrawerNavigator({
	Home: HomeStack,
	Settings: SettingsStack,
});

const NavigationWrapper = () => {
	const [{ status }] = React.useContext(AuthContext);

	return status === 'LOGGED_IN'
		? <AuthNavigationContainer />
		: <LoginNavigationContainer />;
};

const LoginNavigationContainer = createAppContainer(LoginStack);
const AuthNavigationContainer = createAppContainer(AuthNavigator);

export default NavigationWrapper;
