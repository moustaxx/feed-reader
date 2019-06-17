import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { useScreens } from 'react-native-screens';

import Main from './src/Main';

useScreens();

const WrappedApp = () => {
	return (
		<PaperProvider>
			<Main />
		</PaperProvider>
	);
};

export default WrappedApp;
