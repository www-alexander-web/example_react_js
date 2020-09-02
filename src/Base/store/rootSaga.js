// @flow

import type {
	Saga,
} from 'redux-saga';
import {
	all,
	fork,
} from 'redux-saga/effects';

import AuthWatcher from '@base/store/Auth/sagas';
import Infos from '@base/store/Infos/sagas';
import UsersNotifications from '@base/store/UsersNotifications/sagas';
import Accounts from '@base/store/Accounts/sagas';
import Profit from '@base/store/ProfitHistory/sagas';

export default function* root(): Saga<void> {
	try {
		yield all([
			fork(AuthWatcher),
			fork(Infos),
			fork(UsersNotifications),
			fork(Accounts),
			fork(Profit),
		]);
	} finally {
		// always runs
	}
}
