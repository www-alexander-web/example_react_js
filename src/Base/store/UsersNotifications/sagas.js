// @flow

import type {
	Saga,
} from 'redux-saga';
import {
	call,
	put,
	takeLatest,
} from 'redux-saga/effects';

import type {
	GetUsersResp,
	PutUsersUpdateResp,
} from '@base/types/grups';
import {
	apiRequestAML,
} from '@base/providers/sagas';
import {
	setErrorNotification,
	setSuccessNotification,
} from '@base/store/Notifications/actions';
import {
	usersNotificationsSuccess,
	usersNotificationsFail,
	usersPutSuccess,
	usersPutFail,
	usersUpdatedDataReset,
} from '@base/store/UsersNotifications/actions';
import {
	USERS_NOTIFICATIONS_REQUEST,
	USERS_PUT_REQUEST,
} from '@base/store/UsersNotifications/constants';
import type {
	UsersPutAction,
} from '@base/store/UsersNotifications/types';

export function* usersNotificationsSaga(): Saga<void> {
	try {
		const usersResponse: GetUsersResp	= yield call(apiRequestAML, 'getUsers');

		if (usersResponse.success) {
			const dataRaw = usersResponse.users || [];
			yield put(usersNotificationsSuccess(dataRaw));
		} else if (
			usersResponse.error !== null
			&& usersResponse.error !== undefined
			&& usersResponse.error !== ''
		) {
			throw new Error(usersResponse.error);
		} else {
			throw new Error('Unknown error');
		}
	} catch (err) {
		yield put(usersNotificationsFail({
			error: err.message,
		}));
		yield put(setErrorNotification(err.message));
	}
}

function* usersPutSaga(action: UsersPutAction): Saga<void> {
	try {
		const {
			bot,
			data,
		} = action.payload;
		const usersResponse: PutUsersUpdateResp = yield call(apiRequestAML, 'putUsersUpdate', {

			notifications: data,
			request: bot,
		});

		if (usersResponse.success) {
			yield put(usersPutSuccess());
			yield put(setSuccessNotification('Common Parameters updated'));
			yield put(usersUpdatedDataReset());
		} else if (
			usersResponse.error !== null
			&& usersResponse.error !== undefined
			&& usersResponse.error !== ''
		) {
			throw new Error(usersResponse.error);
		} else {
			throw new Error('Unknown error');
		}
	} catch (err) {
		yield put(usersPutFail({
			error: err.message,
		}));
		yield put(setErrorNotification(err.message));
	}
}

export default function* watchUsersNotifications(): Saga<void> {
	yield takeLatest(USERS_NOTIFICATIONS_REQUEST, usersNotificationsSaga);
	yield takeLatest(USERS_PUT_REQUEST, usersPutSaga);
}
