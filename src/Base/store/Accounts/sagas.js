// @flow

import {
	call,
	put,
	select,
	takeLeading,
} from 'redux-saga/effects';
import type {
	Saga,
} from 'redux-saga';
import {
	format,
} from 'date-fns';

import {
	apiRequestAML,
} from '@base/providers/sagas';
import {
	setErrorNotification,
	setSuccessNotification,
} from '@base/store/Notifications/actions';
import type {
	AccountsItem,
	GetAccountProfilesResp,
	GetAccountsResp,
	PostAccountCreateReq,
	PostAccountCreateResp,
	PutAccountUpdateReq,
	PutAccountUpdateResp,
} from '@base/types/grups';
import {
	DATE_TIME_FORMAT,
} from '@base/constants/dateFormat';
import type {
	BaseState,
} from '@base/types';
import type {
	AccountProfile,
	AccountsTable,
} from '@base/store/Accounts/types';

import {
	accountCreateActionSuccess,
	accountCreateActionFail,
	accountTableActionSuccess,
	accountTableActionFail,
	accountTableAction,
	accountProfilesActionSuccess,
	accountProfilesActionFail,
	accountBalancesActionSuccess,
	accountBalancesActionFail,
	accountUpdateActionSuccess,
	accountUpdateActionFail,
} from './actions';
import * as accountsTypes from './constants';


function* accountCreateSaga(action: {payload: PostAccountCreateReq}): Saga<void> {
	try {
		const {
			payload,
		} = action;
		const account: PostAccountCreateResp = yield call(apiRequestAML, 'postAccountCreate', {
			req: payload,
		});
		if (account && account.success) {
			const {
				id,
			} = account;
			yield put(accountCreateActionSuccess(id));
			yield put(accountTableAction());
			yield put(setSuccessNotification('Account added'));
		} else if (
			account.error !== null
						&& account.error !== undefined
						&& account.error !== ''
		) {
			throw new Error(account.error);
		} else {
			throw new Error('Unknown error');
		}
	} catch (err) {
		yield put(accountCreateActionFail({
			error: err.message,
		}));
		yield put(setErrorNotification(err.message));
	}
}

function* accountTableSaga(): Saga<void> {
	try {
		const	accounts: GetAccountsResp = yield call(apiRequestAML, 'getAccounts');
		if (accounts.success) {
			const {
				exchanges,
			} = yield select(({
				base,
			}: BaseState) => base.infos);
			const payload: Array<AccountsTable> = accounts.accounts.map((account: AccountsItem) => {
				const createdAt = format(new Date(account.createdAt || ''), DATE_TIME_FORMAT);
				return {
					...account,
					exchangeRaw: account.exchange,
					exchange: exchanges[account.exchange],
					createdAt,
					consumerID: account.consumerID,
				};
			});
			yield put(accountTableActionSuccess(payload));
		} else if (
			accounts.error !== null
						&& accounts.error !== undefined
						&& accounts.error !== ''
		) {
			throw new Error(accounts.error);
		} else {
			throw new Error('Unknown error');
		}
	} catch (err) {
		yield put(accountTableActionFail({
			error: err.message,
		}));
		yield put(setErrorNotification(err.message));
	}
}

function* accountProfilesSaga(action): Saga<void> {
	try {
		const {
			userId,
		} = action.payload;

		const accountProfiles: GetAccountProfilesResp = yield call(apiRequestAML, 'getAccountProfiles', {
			userId,
		});
		if (accountProfiles.success) {
			if (Array.isArray(accountProfiles.profiles)) {
				const {
					botTypes,
				} = yield select(({
					base,
				}: BaseState) => base.infos);
				const payload: Array<AccountProfile> = accountProfiles.profiles.map((profile) => {
					const createdAt = format(new Date(profile.createdAt || ''), DATE_TIME_FORMAT);
					return {
						...profile,
						lastStartTime: profile.lastStartTime
							? format(new Date(profile.lastStartTime), DATE_TIME_FORMAT) : profile.lastStartTime,
						createdAt,
						botType: botTypes[profile.bot],
					};
				});

				yield put(accountProfilesActionSuccess(payload));
			} else {
				yield put(accountProfilesActionSuccess([]));
			}
		} else if (
			accountProfiles.error !== null
						&& accountProfiles.error !== undefined
						&& accountProfiles.error !== ''
		) {
			throw new Error(accountProfiles.error);
		} else {
			throw new Error('Unknown error');
		}
	} catch (err) {
		yield put(accountProfilesActionFail({
			error: err.message,
		}));
		yield put(setErrorNotification(err.message));
	}
}

function* accountBalancesSaga(action): Saga<void> {
	try {
		const {
			coins,
		} = yield select(({
			base,
		}: BaseState) => base.infos);
		const {
			balances,
		} = action.payload;
		const payload = Object.keys((balances) || {})
			.map((balance, index) => ({
				id: `#${index + 1}`,
				label: coins[balance],
				value: balances[balance],
			}));
		yield put(accountBalancesActionSuccess(payload));
	} catch (err) {
		yield put(accountBalancesActionFail({
			error: err.message,
		}));
		yield put(setErrorNotification(err.message));
	}
}

function* accountUpdateSaga(action: {payload: PutAccountUpdateReq}): Saga<void> {
	try {
		const {
			payload,
		} = action;
		const account: PutAccountUpdateResp = yield call(apiRequestAML, 'putAccountUpdate', {
			req: payload,
		});
		if (account && account.success) {
			yield put(accountUpdateActionSuccess());
			yield put(accountTableAction());
			yield put(setSuccessNotification('Account updated'));
		} else if (
			account.error !== null
						&& account.error !== undefined
						&& account.error !== ''
		) {
			throw new Error(account.error);
		} else {
			throw new Error('Unknown error');
		}
	} catch (err) {
		yield put(accountUpdateActionFail({
			error: err.message,
		}));
		yield put(setErrorNotification(err.message));
	}
}

export default function* watchAccounts(): Saga<void> {
	yield takeLeading(accountsTypes.BASE_ACCOUNT_CREATE_REQUEST, accountCreateSaga);
	yield takeLeading(accountsTypes.BASE_ACCOUNT_TABLE_REQUEST, accountTableSaga);
	yield takeLeading(accountsTypes.BASE_ACCOUNT_PROFILES_REQUEST, accountProfilesSaga);
	yield takeLeading(accountsTypes.BASE_ACCOUNT_BALANCES_REQUEST, accountBalancesSaga);
	yield takeLeading(accountsTypes.BASE_ACCOUNT_UPDATE_REQUEST, accountUpdateSaga);
}
