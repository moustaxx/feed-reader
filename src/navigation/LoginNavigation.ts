import { createStackNavigator, createAppContainer } from 'react-navigation';

import { headerStyles } from './common';
import LoginScreen from '../screens/LoginScreen/LoginScreen';

const LoginStack = createStackNavigator({
	Login: {
		screen: LoginScreen,
		navigationOptions: {
			title: 'Login',
			...headerStyles,
		},
	},
}, { initialRouteName: 'Login' });

const LoginNavigationContainer = createAppContainer(LoginStack);
export default LoginNavigationContainer;
