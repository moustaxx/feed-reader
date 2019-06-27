import React from 'react';
import { Platform } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { useScreens } from 'react-native-screens'; // eslint-disable-line import/no-unresolved

import Main from './src/Main';
import theme from './src/theme';

if (Platform.OS !== 'web') useScreens();

const WrappedApp = () => {
	return (
		<PaperProvider theme={theme}>
			<Main />
		</PaperProvider>
	);
};

export default WrappedApp;
