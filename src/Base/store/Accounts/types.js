// @flow

import type {	ExtractReturn } from '@base/utils/utilitiesTypes';
import type { AccountsItem } from '@base/types/grups';

import {
	accountCreateAction,
	accountCreateActionSuccess,
	accountCreateActionFail,
	accountTableAction,
	accountTableActionSuccess,
	accountTableActionFail,
	accountBalancesAction,
	accountBalancesActionSuccess,
	accountBalancesActionFail,
	accountProfilesAction,
	accountProfilesActionSuccess,
	accountProfilesActionFail,
	accountUpdateAction,
	accountUpdateActionSuccess,
	accountUpdateActionFail,
} from './actions';

export type AccountsTable = {|
		...AccountsItem,
		exchangeRaw: string,
|};

export type AccountProfile = {|
		account: {
				bot: string,
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
		id: string,
		label: string,
		value: number,
};

export type typeGetProfilesReqAction = { userId: number };
export type typeGetBalancesReqAction = {
		balances: {
				[string]: number,
		}
};

export type AccountsActions =
	| ExtractReturn<typeof accountCreateAction>
	| ExtractReturn<typeof accountCreateActionSuccess>
	| ExtractReturn<typeof accountCreateActionFail>
	| ExtractReturn<typeof accountTableAction>
	| ExtractReturn<typeof accountTableActionSuccess>
	| ExtractReturn<typeof accountTableActionFail>
	| ExtractReturn<typeof accountBalancesAction>
	| ExtractReturn<typeof accountBalancesActionSuccess>
	| ExtractReturn<typeof accountBalancesActionFail>
	| ExtractReturn<typeof accountProfilesAction>
	| ExtractReturn<typeof accountProfilesActionSuccess>
	| ExtractReturn<typeof accountProfilesActionFail>
	| ExtractReturn<typeof accountUpdateAction>
	| ExtractReturn<typeof accountUpdateActionSuccess>
	| ExtractReturn<typeof accountUpdateActionFail>;
