import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';

import articlesReducer from './articles/articles.reducer';

export const rootReducer = combineReducers({
	articles: articlesReducer,
});

const persistedReducer = persistReducer({
	storage: AsyncStorage,
	key: 'root',
}, rootReducer);

export const store = createStore(
	persistedReducer,
	composeWithDevTools(
		applyMiddleware(thunk),
	),
);

export const persistor = persistStore(store);
