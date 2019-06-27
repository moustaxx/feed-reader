import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

import Settings from './Settings';
import Home from './Home';

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
