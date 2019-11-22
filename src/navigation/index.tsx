import React from 'react';
import { useSelector } from 'react-redux';

import AuthNavigationContainer from './AuthNavigation';
import LoginNavigationContainer from './LoginNavigation';
import { IAppState } from '../store/types';
import { feedly } from '../utils/feedlyClient';

const NavigationWrapper = () => {
	const {
		userID,
		accessToken,
		refreshToken,
	} = useSelector((state: IAppState) => state.secure);
	const isLoggedIn = React.useMemo(() => {
		if (!userID || !accessToken || !refreshToken) return false;
		feedly.restoreAuthData({ userID, accessToken, refreshToken });
		return true;
	}, [accessToken, refreshToken, userID]);

	return isLoggedIn
		? <AuthNavigationContainer />
		: <LoginNavigationContainer />;
};

export default NavigationWrapper;
