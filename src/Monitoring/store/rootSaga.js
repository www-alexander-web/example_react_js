// @flow

import type {
	Saga,
} from 'redux-saga';
import {
	all,
	fork,
} from 'redux-saga/effects';

import AccountsWatcher from '@mg/store/Accounts/sagas';

export default function* root(): Saga<void> {
	try {
		yield all([
			fork(AccountsWatcher),
		]);
	} finally {
		// always runs
	}
}
