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

const styles = StyleSheet.create({
	header: {
		backgroundColor: 'blue',
	},
	headerTitle: {
		color: '#fff',
	},
	menu: {
		marginHorizontal: 16,
	},
});

const navOpts = {
	headerRight: <IconButton
		onPress={() => alert('This is a button!')}
		style={styles.menu}
		icon="menu"
		color="#fff"
	/>,
	headerStyle: styles.header,
	headerTitleStyle: styles.headerTitle,
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
