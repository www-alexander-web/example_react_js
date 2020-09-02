// @flow

import type {
	Saga,
} from 'redux-saga';
import {
	all,
	fork,
} from 'redux-saga/effects';


import baseSaga from '@base/store/rootSaga';

import monitoringSaga from '@mg/store/rootSaga';

export default function* root(): Saga<void> {
	try {
		yield all([
			fork(baseSaga),
			fork(monitoringSaga),
		]);
	} finally {
	// always runs
	}
}
