import { AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { fetchRes } from '../utils/myFetch';

const logout = () => Promise.all([
	fetchRes('/v3/auth/logout', { method: 'POST' }),
	AsyncStorage.removeItem('userID'),
	SecureStore.deleteItemAsync('accessToken'),
	SecureStore.deleteItemAsync('refreshToken'),
]);

export default logout;
