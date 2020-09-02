// @flow

import type { AccountsTable } from '@base/store/Accounts/types';
import type { ExtractReturn } from '@base/utils/utilitiesTypes';

import {
	accountsReqAction,
	accountProfilesReqAction,
} from './actions';

export type AccountsAccount = {|
	...AccountsTable
|};

export type AccountProfile = {|
	account: {
		createdAt: string,
		exchange: string,
		id: number,
		name: string,
		userEmail: string,
		userID: number
	},
	botType: string,
	accountID: number,
	bot: string,
	createdAt: string,
	description: string,
	id: number,
	lastStartTime: string,
	name: string,
	otherAccount: {
		bot: string,
		createdAt: string,
		exchange: string,
		id: number,
		name: string,
		userEmail: string,
		userID: number
	},
	otherAccountID: number,
	sessionID: string,
	settings: {
		calcSettings: {
			bollingerBands: {
				mult: number,
				n: number,
			},
			sma: {
				n: number,
			},
		}
	},
	userEmail: string,
	userID: number,
	windowSize: number
|};

export type AccountBalance = {
	id?: string,
	label?: string,
	value?: number,
};

export type typeGetProfilesReqAction = { userId: number };
export type typeGetBalancesReqAction = {
	balances?: {
		btc?: number,
		dash?: number,
		eth?: number,
		usd?: number,
		xzc?: number
	}
};

export type AccountsReqAction = ExtractReturn<typeof accountsReqAction>;
// export type AccountsFailAction = ExtractReturn<typeof accountsFailAction>;
// export type AccountsReqSuccessAction = ExtractReturn<typeof accountsReqSuccessAction>;
// export type WalletTransactionsReqAction = ExtractReturn<typeof walletTransactionsReqAction>;
// export type WalletTransactionsFailAction = ExtractReturn<typeof walletTransactionsFailAction>;
// export type WalletTransactionsReqSuccessAction =
// 	ExtractReturn<typeof walletTransactionsReqSuccessAction>;

export type AccountsOrdersReqAction = ExtractReturn<typeof accountProfilesReqAction>;


export type AccountsActions =
	| AccountsReqAction
	| AccountsOrdersReqAction;
