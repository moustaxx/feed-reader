import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { IconButton } from 'react-native-paper';

import mainStyles from './Main.style';
import Settings from './Settings';
import Home from './Home';
import ArticleScreen from './ArticleScreen';

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
		screen: Home,
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
		screen: Settings,
		navigationOptions: {
			title: 'Settings',
			...navOpts,
		},
	},
}, { initialRouteName: 'Home' });

const NavigationContainer = createAppContainer(RootStack);

export default Main;
