import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import Main from './src/Main';

const WrappedApp = () => {
	return (
		<PaperProvider>
			<Main />
		</PaperProvider>
	);
};

export default WrappedApp;
