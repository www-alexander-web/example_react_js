// @flow
import {
	type Reducer,
	combineReducers,
} from 'redux';
import {
	connectRouter,
} from 'connected-react-router';
import {
	persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
	setTransformToken,
	setTransformIsAuth,
	expireTransform,
} from '@base/store/persistTransforms';
import history from '@base/utils/history';
import authReducer from '@base/store/Auth';
import infosReducer from '@base/store/Infos';
import notificationsReducer from '@base/store/Notifications';
import modalReducer from '@base/store/Modal';
import usersNotificationsReducer from '@base/store/UsersNotifications';
import profitsReducer from '@base/store/ProfitHistory';
import uiReducer from '@base/store/UI';
import type {
	BaseState,
	BaseActions,
} from '@base/types';
import accountsReducer from '@base/store/Accounts';

export const router = connectRouter(history);

const authPersistConfig = {
	key: 'auth-token',
	storage, // TODO: replace by custom storage
	whitelist: [
		'token',
		'isAuth',
	],
	transforms: [
		setTransformToken,
		setTransformIsAuth,
	],
};

const infosPersistConfig = {
	key: 'infos-store',
	storage,
	blacklist: [
		'optionsTestTypes',
		'testTypes',
		'isLoading',
		'errors',
	],
	transforms: [
		expireTransform,
	],
};

const base: Reducer<BaseState, BaseActions> = combineReducers({
	// $FlowFixMe
	auth: persistReducer(authPersistConfig, authReducer),
	// $FlowFixMe
	infos: persistReducer(infosPersistConfig, infosReducer),
	notifications: notificationsReducer,
	modal: modalReducer,
	users: usersNotificationsReducer,
	ui: uiReducer,
	components: combineReducers({
		accounts: accountsReducer,
		profits: profitsReducer,
	}),
});

export default base;
