// @flow

import * as authTypes from './constants';

export const authLogout = () => ({
	type: authTypes.AUTH_LOGOUT,
});

export const authReqLogin = (payload: {|
	email: string,
	password: string,
|}) => ({
	type: authTypes.AUTH_REQ_LOGIN,
	payload,
});

export const authReqLoginSend = () => ({
	type: authTypes.AUTH_REQ_LOGIN_SEND,
});

export const authReqLoginSuccess = (payload: {|
	email: string,
	password: string,
|}) => ({
	type: authTypes.AUTH_REQ_LOGIN_SUCCESS,
	payload,
});

export const authReqLoginError = (payload: {| error: string |}) => ({
	type: authTypes.AUTH_REQ_LOGIN_ERROR,
	payload,
});

export const authReqAuth = (payload: {|
	authCode: number,
	path: string,
|}) => ({
	type: authTypes.AUTH_REQ_AUTH,
	payload,
});

export const authReqAuthSend = () => ({
	type: authTypes.AUTH_REQ_AUTH_SEND,
});

export const authReqAuthSuccess = (payload: {|
	token: string,
	expiresAt: number,
|}) => ({
	type: authTypes.AUTH_REQ_AUTH_SUCCESS,
	payload,
});

export const authReqAuthError = (payload: {| error: string |}) => ({
	type: authTypes.AUTH_REQ_AUTH_ERROR,
	payload,
});

export const authResendAuthCode = () => ({
	type: authTypes.AUTH_RESEND_AUTH_CODE,
});

export const checkToken = () => ({
	type: authTypes.CHECK_TOKEN,
});

export default null;
