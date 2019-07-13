import React from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator, NavigationScreenProps, NavigationScreenProp } from 'react-navigation';
import { IconButton } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';

import './registerLocale';
import mainStyles from './Main.style';
import SettingsScreen from './screens/SettingsScreen/SettingsScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ArticleScreen from './screens/ArticleScreen/ArticleScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import useSettings, { SettingsContext } from './utils/useSettings';
import { AuthContext, IAuthStatus } from './contexts/AuthContext';

const NavigationWrapper = () => {
	const [authData] = React.useContext(AuthContext);

	return authData.status === 'LOGGED_IN'
		? <AuthNavigationContainer />
		: <LoginNavigationContainer />;
};

const Main = () => {
	const { loading, settings, setSettings } = useSettings();
	const [authState, setAuthState] = React.useState<null | IAuthStatus>(null);

	React.useEffect(() => {
		const getUserID = async () => {
			const userID = await AsyncStorage.getItem('userID');
			const status = userID ? 'LOGGED_IN' : 'LOGGED_OUT';
			setAuthState({ userID, status });
		};
		getUserID();
	}, []);

	if (!authState || loading) return <AppLoading />;
	return (
		<AuthContext.Provider value={[authState, setAuthState]}>
			<SettingsContext.Provider value={[settings, setSettings]}>
				<NavigationWrapper />
			</SettingsContext.Provider>
		</AuthContext.Provider>
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
	Home: {
		screen: RootStack,
	},
	Settings: {
		screen: SettingsStack,
	},
});

const LoginNavigationContainer = createAppContainer(LoginStack);
const AuthNavigationContainer = createAppContainer(AuthNavigator);

export default Main;
