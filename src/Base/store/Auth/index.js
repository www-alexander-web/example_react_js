// @flow

import * as authTypes from './constants';
import type {
	AuthActions,
} from './types';

export type TokenState = ?{|
	token?: string,
	expiresAt?: number,
|};

export type AuthState = {|
	isLoading: boolean,
	isAuth: boolean,
	token: TokenState,
	email: string,
	password: string,
	error: string,
|};

export type AuthActionsType = AuthActions;

const initialState: AuthState = {
	isLoading: false,
	// isAuth: false,
	isAuth: true,
	email: '',
	password: '',
	error: '',
	token: null,
};

export default (
	state: AuthState = initialState,
	action: AuthActions,
): AuthState => {
	switch (action.type) {
		case authTypes.AUTH_REQ_LOGIN_SEND: {
			return {
				...state,
				isLoading: true,
			};
		}

		case authTypes.AUTH_REQ_LOGIN_SUCCESS: {
			const {
				email, password,
			} = action.payload;
			return {
				...state,
				email,
				password,
				isLoading: false,
			};
		}

		case authTypes.AUTH_REQ_LOGIN_ERROR: {
			return {
				...state,
				...action.payload,
				isLoading: false,
			};
		}

		case authTypes.AUTH_REQ_AUTH_SEND: {
			return {
				...state,
				isLoading: true,
			};
		}

		case authTypes.AUTH_REQ_AUTH_SUCCESS: {
			return {
				...initialState,
				token: {
					...state.token,
					...action.payload,
				},
				isAuth: true,
			};
		}

		case authTypes.AUTH_REQ_AUTH_ERROR: {
			return {
				...state,
				...action.payload,
				isLoading: false,
			};
		}

		case authTypes.AUTH_LOGOUT: {
			return {
				...initialState,
			};
		}

		case authTypes.CHECK_TOKEN: {
			return {
				...state,
			};
		}

		default: {
			return state;
		}
	}
};
