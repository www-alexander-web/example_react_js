// @flow

import {
	createTransform,
} from 'redux-persist';
import createExpirationTransform from 'redux-persist-transform-expire';

import type {
	TokenState,
} from '@base/store/Auth';

export const setTransformToken = createTransform(
	(state: TokenState) => {
		if (state && state.token != null) {
			return state;
		}

		return null;
	},
	(token: TokenState) => {
		if (token && (token.expiresAt || 0) > Date.now()) {
			return token;
		}

		return null;
	},
	{
		whitelist: [
			'token',
		],
	},
);

export const setTransformIsAuth = createTransform(
	undefined,
	(state: boolean, key: string, fullStateJSON: { isAuth: string, token: string }) => {
		const token: TokenState = JSON.parse(fullStateJSON.token);

		if (!token || (token.expiresAt || 0) < Date.now()) {
			return false;
		}

		return state;
	},
	{
		whitelist: [
			'isAuth',
		],
	},
);
export const expireTransform = createExpirationTransform({
	expireKey: 'persistExpiresAt', // default
	defaultState: {}, // default
});
