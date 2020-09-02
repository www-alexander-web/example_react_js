// @flow

import type {
	Saga,
} from 'redux-saga';
import {
	all,
	call,
	put,
	takeLatest,
} from 'redux-saga/effects';
import {
	format,
} from 'date-fns';

import {
	DATE_TIME_FORMAT,
} from '@base/constants/dateFormat';
import type {
	PostProfitsResp,
	PostProfitsReq,
	PostProfitsCountResp,
} from '@base/types/grups';
import {
	apiRequestAML,
} from '@base/providers/sagas';
import {
	setErrorNotification,
} from '@base/store/Notifications/actions';
import {
	profitsSuccess,
	profitsFail,
} from '@base/store/ProfitHistory/actions';
// import type {
// 	ProfitsTable,
// } from '@base/store/ProfitHistory/types';
import {
	PROFITS_REQUEST,
} from '@base/store/ProfitHistory/constants';

const getItemAccount = (account) => {
	const res = Object.keys(account).map((key) => [ key, account[key] ])
		.map((el) => `${el[1]} ${el[0].toUpperCase()}`);
	return res;
};

export function* profitsSaga(
	{
		payload: request,
	}: {payload: PostProfitsReq},
): Saga<void> {
	try {
		const [
			profits,
			profitsCount,
		]: [
			PostProfitsResp,
			PostProfitsCountResp,
		] = yield all([
			call(apiRequestAML, 'postProfits', {
				request,
			}),
			call(apiRequestAML, 'postProfitsCount', {
				request,
			}),
		]);

		if (profits.success && profitsCount.success) {
			const {
				count,
			} = profitsCount;

			let data;

			if (Array.isArray(profits.profits)) {
				const dataItem = profits.profits.map((profit) => (
					{
						...profit,
						groupIDRow: profit.profit.groupID,
						accountsRow: [...profit.profit.accounts.map(({
							accountID,
							after,
							before,
						}) => ({
							accountID,
							after: getItemAccount(after),
							before: getItemAccount(before),
							accountsDeltaRow: getItemAccount(profit.profit.accountsDelta),
						})),
						],
						deltaRow: getItemAccount(profit.profit.delta),
						totalBTC: profit.profit.total.btc,
						totalUSDT: profit.profit.total.usdt,
						receivedAt: format(new Date(profit.receivedAt || ''), DATE_TIME_FORMAT),
					}
				));
				data = dataItem;
			}

			const payload = {
				data: data || [],
				count: count || 0,
			};
			// $FlowFixMe
			yield put(profitsSuccess(payload));
		} else if (
			profits.error !== null
			&& profits.error !== undefined
			&& profits.error !== ''
		) {
			throw new Error(profits.error);
		} else {
			throw new Error('Unknown error');
		}
	} catch (err) {
		yield put(profitsFail({
			error: err.message,
		}));
		yield put(setErrorNotification(err.message));
	}
}

export default function* watchProfits(): Saga<void> {
	yield takeLatest(PROFITS_REQUEST, profitsSaga);
}
