import React from 'react';
import { IconButton } from 'react-native-paper';
import { NavigationScreenProp, NavigationParams, NavigationRoute } from 'react-navigation';
import theme from '../theme';

const shouldShowBackButton = (
	stackRouteNavigation: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>,
) => {
	const parent = stackRouteNavigation.dangerouslyGetParent()!;
	return parent.state.routes.indexOf(stackRouteNavigation.state) > 0;
};

export const headerStyles = {
	headerStyle: {
		backgroundColor: theme.colors.primary,
	},
	headerTitleStyle: {
		color: theme.colors.headerElements,
	},
	headerTintColor: theme.colors.headerElements,
};

export const navOpts = (
	navigation: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>,
) => ({
	headerLeft: shouldShowBackButton(navigation)
		? () => React.createElement(IconButton, {
			icon: 'arrow-back',
			color: theme.colors.headerElements,
			style: { marginHorizontal: 16 },
			onPress: () => navigation.goBack(),
		})
		: () => React.createElement(IconButton, {
			icon: 'menu',
			color: theme.colors.headerElements,
			style: { marginHorizontal: 16 },
			onPress: () => navigation.toggleDrawer(),
		}),
	...headerStyles,
});
