import React from 'react';

import { AuthContext } from '../contexts/AuthContext';
import AuthNavigationContainer from './AuthNavigation';
import LoginNavigationContainer from './LoginNavigation';

const NavigationWrapper = () => {
	const [{ status }] = React.useContext(AuthContext);

	return status === 'LOGGED_IN'
		? <AuthNavigationContainer />
		: <LoginNavigationContainer />;
};

export default NavigationWrapper;
