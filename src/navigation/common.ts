import React from 'react';
import { IconButton } from 'react-native-paper';
import { NavigationScreenProp, NavigationParams, NavigationRoute } from 'react-navigation';

const shouldShowBackButton = (
	stackRouteNavigation: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>,
) => {
	const parent = stackRouteNavigation.dangerouslyGetParent()!;
	return parent.state.routes.indexOf(stackRouteNavigation.state) > 0;
};

export const headerStyles = {
	headerStyle: {
		backgroundColor: 'blue',
	},
	headerTitleStyle: {
		color: '#fff',
	},
	headerTintColor: '#fff',
};

export const navOpts = (
	navigation: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>,
) => ({
	headerLeft: shouldShowBackButton(navigation)
		? React.createElement(IconButton, {
			icon: 'arrow-back',
			color: '#fff',
			style: { marginHorizontal: 16 },
			onPress: () => navigation.goBack(),
		})
		: React.createElement(IconButton, {
			icon: 'menu',
			color: '#fff',
			style: { marginHorizontal: 16 },
			onPress: () => navigation.toggleDrawer(),
		}),
	...headerStyles,
});
