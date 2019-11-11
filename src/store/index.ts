import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import articlesReducer from './articles/articles.reducer';

export const rootReducer = combineReducers({
	articles: articlesReducer,
});

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk),
	),
);

export default store;
