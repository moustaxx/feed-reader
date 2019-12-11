import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import createSecureStore from 'redux-persist-expo-securestore';

import articlesReducer from './articles/articles.reducer';
import settingsReducer from './settings/settings.reducer';
import secureReducer from './secure/secure.reducer';

const secureStorage = createSecureStore();

const persistedSettingsReducer = persistReducer({
	storage: AsyncStorage,
	key: 'settings',
}, settingsReducer);

const persistedSecureReducer = persistReducer({
	storage: secureStorage,
	key: 'secure',
	timeout: 10000,
}, secureReducer);

export const rootReducer = combineReducers({
	articles: articlesReducer,
	settings: persistedSettingsReducer,
	secure: persistedSecureReducer,
});

export const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk),
	),
);

export const persistor = persistStore(store);
