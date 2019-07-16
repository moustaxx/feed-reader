import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';

import './registerLocale';
import theme from './theme';
import NavigationWrapper from './navigation';
import useSettings, { SettingsContext } from './utils/useSettings';
import { AuthContext, IAuthStatus } from './contexts/AuthContext';

const Main = () => {
	const { loading, settings, setSettings } = useSettings();
	const [authState, setAuthState] = React.useState<null | IAuthStatus>(null);

	React.useEffect(() => {
		const getUserID = async () => {
			const userID = await AsyncStorage.getItem('userID');
			const status = userID ? 'LOGGED_IN' : 'LOGGED_OUT';
			setAuthState({ userID, status });
		};
		getUserID();
	}, []);

	if (!authState || loading) return <AppLoading />;
	return (
		<PaperProvider theme={theme}>
			<AuthContext.Provider value={[authState, setAuthState]}>
				<SettingsContext.Provider value={[settings, setSettings]}>
					<NavigationWrapper />
				</SettingsContext.Provider>
			</AuthContext.Provider>
		</PaperProvider>
	);
};


export default Main;
