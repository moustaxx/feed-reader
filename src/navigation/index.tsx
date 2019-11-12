import React from 'react';
import { useSelector } from 'react-redux';

import AuthNavigationContainer from './AuthNavigation';
import LoginNavigationContainer from './LoginNavigation';
import { IAppState } from '../store/types';

const NavigationWrapper = () => {
	const { status } = useSelector((state: IAppState) => state.secure);

	return status === 'LOGGED_IN'
		? <AuthNavigationContainer />
		: <LoginNavigationContainer />;
};

export default NavigationWrapper;
