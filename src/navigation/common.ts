import React from 'react';
import { IconButton } from 'react-native-paper';
import { NavigationScreenProp } from 'react-navigation';

export const headerStyles = {
	headerStyle: {
		backgroundColor: 'blue',
	},
	headerTitleStyle: {
		color: '#fff',
	},
	headerTintColor: '#fff',
};

export const navOpts = (navigation: NavigationScreenProp<{}>) => ({
	headerLeft: React.createElement(IconButton, {
		icon: 'menu',
		color: '#fff',
		style: { marginHorizontal: 16 },
		onPress: () => navigation.toggleDrawer(),
	}),
	...headerStyles,
});
