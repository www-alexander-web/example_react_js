// @flow

import {
	createStore,
	applyMiddleware,
	compose,
	type Dispatch,
} from 'redux';
import {
	routerMiddleware,
} from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import {
	persistStore,
} from 'redux-persist';
import type {
	History,
} from 'history';

import type {
	BaseState,
	BaseActions,
} from '@base/types';

import type {
	MonitoringStateClear,
	MonitoringActionsClear,
} from '@mg/types';


import {
	socketMiddleware,
} from './middlewares';
import createRootReducer from './rootReducer';
import rootSaga from './rootSaga';

export type ReduxState = {
	...BaseState,
	...MonitoringStateClear,
};

export type ReduxActions =
	| BaseActions
	| MonitoringActionsClear

export type ReduxDispatch = Dispatch<ReduxActions>;

export default function configureStore(
	initialState: ReduxState,
	history: History<>,
) {
	let composeEnhancers = compose;

	// If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
	if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
		if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
			composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
		}
	}

	const sagaMiddleware = createSagaMiddleware();

	const middlewares = [
		socketMiddleware(),
		sagaMiddleware,
		routerMiddleware(history),
	];

	const enhancers = [
		applyMiddleware(...middlewares),
	];
	const composedEnhancers = composeEnhancers(...enhancers);

	const store = createStore<ReduxState, ReduxActions, ReduxDispatch>(
		createRootReducer(),
		initialState,
		composedEnhancers,
	);

	const persistor = persistStore(store);

	sagaMiddleware.run(rootSaga);

	return {
		store,
		persistor,
	};
}
