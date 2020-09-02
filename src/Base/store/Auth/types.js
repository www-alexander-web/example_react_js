// @flow

import type {
	ExtractReturn,
} from '@base/utils/utilitiesTypes';

import {
	authReqLogin,
	authReqLoginSend,
	authReqLoginSuccess,
	authReqLoginError,
	authReqAuth,
	authReqAuthSend,
	authReqAuthSuccess,
	authReqAuthError,
	authLogout,
	checkToken,
} from './actions';

export type authReqLoginActionType = ExtractReturn<typeof authReqLogin>;
export type authReqLoginSendActionType = ExtractReturn<typeof authReqLoginSend>;
export type authReqLoginSuccessActionType = ExtractReturn<typeof authReqLoginSuccess>;
export type authReqLoginErrorActionType = ExtractReturn<typeof authReqLoginError>;
export type authReqAuthActionType = ExtractReturn<typeof authReqAuth>;
export type authReqAuthSendActionType = ExtractReturn<typeof authReqAuthSend>;
export type authReqAuthSuccessActionType = ExtractReturn<typeof authReqAuthSuccess>;
export type authReqAuthErrorActionType = ExtractReturn<typeof authReqAuthError>;
export type authLogoutActionType = ExtractReturn<typeof authLogout>;
export type checkTokenActionType = ExtractReturn<typeof checkToken>;

export type AuthActions =
	| authLogoutActionType
	| authReqLoginActionType
	| authReqLoginSendActionType
	| authReqLoginSuccessActionType
	| authReqLoginErrorActionType
	| authReqAuthActionType
	| authReqAuthSendActionType
	| authReqAuthSuccessActionType
	| authReqAuthErrorActionType
	| checkTokenActionType;
