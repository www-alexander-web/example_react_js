// @flow
import type {
	Saga,
} from 'redux-saga';
import {
	all,
	call,
	put,
	select,
	takeLeading,
} from 'redux-saga/effects';
import {
	format,
} from 'date-fns';

import {
	DATE_TIME_FORMAT,
} from '@base/constants/dateFormat';
import {
	setErrorNotification,
} from '@base/store/Notifications/actions';
import {
	apiRequestAML,
} from '@base/providers/sagas';
import type {
	GetAccountsResp,
	GetAccountProfilesResp,
	AccountsItem,
} from '@base/types/grups';

import {
	ACCOUNT_BALANCES_REQUEST,
	ACCOUNT_PROFILES_REQUEST,
	ACCOUNTS_REQUEST,
} from '@mg/store/Accounts/constants';
import {
	accountBalancesFailAction,
	accountBalancesReqSuccessAction,
	accountProfilesFailAction,
	accountProfilesReqSuccessAction,
	accountsFailAction,
	accountsReqSuccessAction,
} from '@mg/store/Accounts/actions';
import type {
	AccountProfile,
	AccountsAccount,
} from '@mg/store/Accounts/types';
import type {
	MonitoringState,
} from '@mg/types';

function* accountsSaga(): Saga<void> {
	try {
		const [
			accounts]: [
			GetAccountsResp,
] = yield all([
	call(apiRequestAML, 'getAccounts'),
]);
		if (accounts.success) {
			const {
				exchanges,
			} = yield select(({
				base,
			}: MonitoringState) => base.infos);
			const payload: Array<AccountsAccount> = accounts.accounts.map((account: AccountsItem) => {
				const createdAt = format(new Date(account.createdAt || ''), DATE_TIME_FORMAT);
				return {
					...account,
					exchangeRaw: account.exchange,
					consumerID: account.consumerID,
					exchange: exchanges[account.exchange],
					createdAt,
				};
			});

			yield put(accountsReqSuccessAction(payload));
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
		yield put(accountsFailAction({
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
				}: MonitoringState) => base.infos);
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

				yield put(accountProfilesReqSuccessAction(payload));
			} else {
				yield put(accountProfilesReqSuccessAction([]));
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
		yield put(accountProfilesFailAction({
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
		}: MonitoringState) => base.infos);
		const {
			balances,
		} = action.payload;
		const payload = Object.keys((balances) || {})
			.map((balance, index) => ({
				id: `#${index + 1}`,
				label: coins[balance],
				value: balances[balance],
			}));
		yield put(accountBalancesReqSuccessAction(payload));
	} catch (err) {
		yield put(accountBalancesFailAction({
			error: err.message,
		}));
		yield put(setErrorNotification(err.message));
	}
}

export default function* watchAccounts(): Saga<void> {
	yield takeLeading(ACCOUNTS_REQUEST, accountsSaga);
	yield takeLeading(ACCOUNT_PROFILES_REQUEST, accountProfilesSaga);
	yield takeLeading(ACCOUNT_BALANCES_REQUEST, accountBalancesSaga);
}
