// @flow

import {
	takeLeading,
	put,
	call,
	all,
} from 'redux-saga/effects';
import type {
	Saga,
} from 'redux-saga';

import type {
	ErrorResponse,
} from '@base/types';
import type {
	GetExchangePairsResp,
	GetExchangesResp,
} from '@base/types/grups';
import {
	apiRequestAML,
} from '@base/providers/sagas';
import {
	infosSuccessAction,
	infosFailAction,
} from '@base/store/Infos/actions';
import {
	INFOS_REQUEST,
} from '@base/store/Infos/constants';

function* infosSaga(): Saga<void> {
	try {
		const [
			coins,
			exchange ]: [
			GetExchangePairsResp | ErrorResponse,
			GetExchangesResp | ErrorResponse,
		] = yield all([
			call(apiRequestAML, 'getInfosPairs'),
			call(apiRequestAML, 'getInfosExchanges'),
		]);

		if (coins.success && exchange.success) {
			const optionsExchange = exchange.integrated.map(
				(key) => ({
					label: exchange.humanNames[key],
					value: key,
				}),
			);

			const optionsRequireExtraAuth = exchange.requireExtraAuth;

			const optionsCoin = Object.keys(coins.humanNames).map(
				(key) => ({
					label: coins.humanNames[key],
					value: key,
				}),
			);

			let optionsPair = {};
			const dataAll = [];
			Object.keys(coins.exchangePairs).forEach(
				(key) => {
					const data = coins.exchangePairs[key].map(
						(item) => {
							dataAll.push(item);
							return {
								label: String(item).toUpperCase(),
								value: item,
							};
						},
					);
					optionsPair = {
						...optionsPair,
						[key]: data,
					};
				},
			);
			const dataAllFiltered = [
				...new Set(dataAll),
			];
			const optionsPairAll = dataAllFiltered.map(
				(item) => ({
					label: String(item).toUpperCase(),
					value: item,
				}),
			);
			optionsPair = {
				...optionsPair,
				all: optionsPairAll,
			};


			let optionsCoins = {};
			const dataAllCoins = [];
			Object.keys(coins.exchangeCoins).forEach(
				(key) => {
					const data = coins.exchangeCoins[key].map(
						(item) => {
							dataAllCoins.push(item);
							return {
								label: coins.humanNames[item] || item,
								value: item,
							};
						},
					);
					optionsCoins = {
						...optionsCoins,
						[key]: data,
					};
				},
			);
			const dataAllCoinsFiltered = [
				...new Set(dataAllCoins),
			];
			const optionsCoinsAll = dataAllCoinsFiltered.map(
				(item) => ({
					label: coins.humanNames[item] || item,
					value: item,
				}),
			);
			optionsCoins = {
				...optionsCoins,
				all: optionsCoinsAll,
			};

			const payload = {
				coins: coins.humanNames,
				exchanges: exchange.humanNames,
				exchangesIntegrated: exchange.integrated,
				exchangePairs: coins.exchangePairs,
				optionsExchange,
				exchangeCoins: coins.exchangeCoins,
				optionsCoins,
				optionsCoin,
				optionsPair,
				rounding: coins.rounding.pairs,
				defaultRounding: coins.rounding.default,
				optionsRequireExtraAuth,
			};

			yield put(infosSuccessAction(payload));
		} else if (
			coins.error !== null
			&& coins.error !== undefined
			&& coins.error !== ''
		) {
			throw new Error(coins.error);
		} else {
			throw new Error('Unknown error');
		}
	} catch (err) {
		yield put(infosFailAction({
			error: err.message,
		}));
	}
}

export default function* watchSettings(): Saga<void> {
	yield takeLeading(INFOS_REQUEST, infosSaga);
}
