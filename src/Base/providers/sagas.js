// @flow

import {
	call,
	select,
} from 'redux-saga/effects';
import type {
	Saga,
} from 'redux-saga';

import type {
	BaseState,
} from '@base/types';
import ApiProvider from '@base/providers/grups';
import ApiProviderDefault from '@base/providers/apiProviderDefault';

export const getApiRequestSaga = <T: {...BaseState}>(
	Api: typeof ApiProviderDefault) => function* apiRequestSagaDefault<
	O: {
		headers?: {
			Authorization?: string,
			...
		},
		...
	},
	R
>(
		apiMethod: string,
		options: O | null = null,
	): Saga<R> {
		const parameters: O = {
			...options,
		};
		const method = Api[apiMethod];
		if (method && method.security) {
			try {
				const {
					token,
				} = yield select(({
					base,
				}: T) => base.auth.token);

				if (parameters.headers === null || parameters.headers === undefined) {
					parameters.headers = {};
				}

				parameters.headers.Authorization = token;
			} finally {
				// always runs
			}
		}
		try {
			return yield call([
				Api,
				method,
			], parameters);
		} finally {
			// always runs
		}
	};

export const apiRequestAML = getApiRequestSaga<BaseState>(ApiProvider);

export default null;
