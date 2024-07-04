import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { userReducer, postReducer, appReducer } from './reducers';
import { thunk } from 'redux-thunk';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	post: postReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk)),
);
