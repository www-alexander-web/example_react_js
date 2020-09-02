/* eslint-disable import/no-named-as-default-member */
// @flow

import {
	put,
	takeLatest,
	takeEvery,
	select,
	call,
} from 'redux-saga/effects';
import {
	push,
} from 'connected-react-router';
import type {
	Saga,
} from 'redux-saga';

import apiActions from '@starter/store/api/actions';

import {
	AUTH_REQ_LOGIN,
	AUTH_REQ_AUTH,
	AUTH_LOGOUT,
	CHECK_TOKEN,
} from '@base/store/Auth/constants';
import {
	infosAction,
} from '@base/store/Infos/actions';
import {
	authReqLoginSend,
	authReqLoginError,
	authReqLoginSuccess,
	authReqAuthSend,
	authReqAuthError,
	authReqAuthSuccess,
} from '@base/store/Auth/actions';
import type {
	BaseState,
	CommonResponse,
	ErrorResponse,
} from '@base/types';
import type {
	GetTokenResp,
} from '@base/types/grups';
import {
	apiRequestAML,
} from '@base/providers/sagas';
import type {
	authReqLoginActionType,
	authReqAuthActionType,
} from '@base/store/Auth/types';

export function* authReqAuthSaga({
	payload: {
		authCode, path,
	},
}: authReqAuthActionType): Saga<void> {
	try {
		yield put(authReqAuthSend());
		const {
			email, password,
		} = yield select(({
			base,
		}: BaseState) => ({
			email: base.auth.email,
			password: base.auth.password,
		}));

		const body = {
			authCode,
			email,
			password,
		};
		const response: GetTokenResp | ErrorResponse = yield call(
			apiRequestAML,
			'postLogin',
			{
				body,
			},
		);

		if (response.success) {
			const {
				token: {
					token,
					expiresAt: expiresAtSec,
				},
			} = response;
			const expiresAt = parseInt(expiresAtSec, 10) * 1000;

			yield put(authReqAuthSuccess({
				token,
				expiresAt,
			}));
			yield put(infosAction());
			yield put(push(path));
		} else {
			throw new Error(response.error);
		}
	} catch (error) {
		yield put(authReqAuthError({
			error: error.message,
		}));
	}
}

export function* authReqLoginSaga({
	payload,
}: authReqLoginActionType): Saga<void> {
	try {
		yield put(authReqLoginSend());

		// const response: GetTokenResp | ErrorResponse = yield call(
		// 	apiRequestAML,
		// 	'postAuth',
		// 	{
		// 		body: payload,
		// 	},
		// );
		const response = {
			success: true,
			token: {
				expiresAt: '1598766355',
				token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTg3NjYzNTUsImp0aSI6IjFnbWNMeEpmNEdUdnJwbkQzenVlc21qdWhKdyIsInN1YiI6ImFjY2VzcyIsImVtYWlsIjoiYW1sMmZhQHNmeGR4LnJ1Iiwicm9sZUlEIjoxLCJ1c2VySUQiOjF9.rN2LaSW3pq76E_KNHnQcLCsSo5VdoHaDiiFvdPcNXfY',
				type: 'access',
			},
		};
		// console.log('authReqLoginSaga, response', response);

		if (response.success) {
			yield put(authReqLoginSuccess(payload));
			// Если пришел токен, то делаем сразу авторизацию и не идем в 2fa
			if (response.token && response.token.token && response.token.expiresAt) {
				const {
					token: {
						token,
						expiresAt: expiresAtSec,
					},
				} = response;
				const expiresAt = parseInt(expiresAtSec, 10) * 1000;

				yield put(authReqAuthSuccess({
					token,
					expiresAt,
				}));
				yield put(infosAction());
				yield put(push('/auth/project-select'));
			} else {
				yield put(authReqLoginSuccess(payload));
				yield put(push('/auth/2fa'));
			}
		} else {
			throw new Error(response.error);
		}
	} catch (error) {
		yield put(authReqLoginError({
			error: error.message,
		}));
	}
}

export function* authLogOutSaga(): Saga<void> {
	try {
		yield put(push('/auth'));
	} finally {
		// always runs
	}
}

export function* checkTokenSaga(): Saga<void> {
	try {
		const token = yield select((state: BaseState) => {
			// eslint-disable-next-line no-shadow
			const { token } = state.base.auth;
			return token ? token.token : '';
		});
		const { ui } = yield select((state: BaseState) => state.base);

		if (token && ui.CHECK_TOKEN !== 'REQUEST') {
			yield put(apiActions.request(CHECK_TOKEN));

			const res: CommonResponse | ErrorResponse = yield call(
				apiRequestAML,
				'checkToken',
				{ body: { token } },
			);

			if (!res.success) {
				yield put(apiActions.error(CHECK_TOKEN));
				yield put({ type: AUTH_LOGOUT });
			} else {
				yield put(apiActions.success(CHECK_TOKEN));
			}
		}

		// yield put(apiActions.reset(CHECK_TOKEN));
	} catch (error) {
		yield put(authReqAuthError({
			error: error.message,
		}));
	}
}

export default function* watchAuth(): Saga<void> {
	yield takeLatest(AUTH_REQ_LOGIN, authReqLoginSaga);
	yield takeLatest(AUTH_REQ_AUTH, authReqAuthSaga);
	yield takeLatest(AUTH_LOGOUT, authLogOutSaga);
	yield takeEvery(CHECK_TOKEN, checkTokenSaga);
}
