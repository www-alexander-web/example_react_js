// @flow
import type {
	CommonResponse,
	ErrorResponse,
} from '@base/types';

export type AccountsProfilesItem = {|
	bot: string,
	id: number,
	name: string,
|}

export type AccountsItem = {|
	balances: {
		[string]: number,
	},
	createdAt: string,
	exchange: string,
	id: number,
	name: string,
	userEmail: string,
	userID: number,
	consumerID: number,
	profiles: AccountsProfilesItem[],
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
	label: string,
	value: number,
};

export type GeneralAccountReq = {
	apiKey: string,
	name: string,
	secretKey: string,
	userID: number,
};

export type GetAccountsResp = {
	...CommonResponse,
	accounts: Array<AccountsItem>,
} | ErrorResponse;

export type PostAccountCreateReq = {|
	apiKey: string,
	exchange: string,
	extra: string,
	name: string,
	secretKey: string,
	consumerID: number,
|};

export type PutAccountUpdateReq = {|
	apiKey: string,
	accountID: number,
	extra: string,
	name: string,
	secretKey: string,
	consumerID?: number,
|};

export type GetAccountProfilesResp = {
	...CommonResponse,
	profiles: Array<AccountProfile>,
} | ErrorResponse;

export type PostAccountCreateResp = {
	...CommonResponse,
	id: number,
} | ErrorResponse;

export type PutAccountUpdateResp = {
	...CommonResponse,
} | ErrorResponse;
