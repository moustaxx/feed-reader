import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import articlesReducer from './articles/articles.reducer';

const reducers = combineReducers({
	reducers: articlesReducer,
});

const store = createStore(
	reducers,
	composeWithDevTools(
		applyMiddleware(thunk),
	),
);

export default store;
