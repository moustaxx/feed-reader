import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './registerLocale';
import theme from './theme';
import { store, persistor } from './store';
import NavigationWrapper from './navigation';

const Main = () => {
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<PaperProvider theme={theme}>
					<NavigationWrapper />
				</PaperProvider>
			</PersistGate>
		</ReduxProvider>
	);
};


export default Main;
