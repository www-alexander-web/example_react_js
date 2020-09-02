// @flow

import type {
	AccountBalance,
	AccountProfile,
	AccountsAccount,
	typeGetBalancesReqAction,
	typeGetProfilesReqAction,
} from '@mg/store/Accounts/types';

import * as accountsTypes from './constants';


export const accountsReqAction = () => ({
	type: accountsTypes.ACCOUNTS_REQUEST,
});

export const accountsReqSuccessAction = (payload: Array<AccountsAccount>) => ({
	type: accountsTypes.ACCOUNTS_SUCCESS,
	payload,
});

export const accountsFailAction = (payload: {| error: string |}) => ({
	type: accountsTypes.ACCOUNTS_FAIL,
	payload,
});


export const accountProfilesReqAction = (payload: typeGetProfilesReqAction) => ({
	type: accountsTypes.ACCOUNT_PROFILES_REQUEST,
	payload,
});

export const accountProfilesReqSuccessAction = (payload: Array<AccountProfile>) => ({
	type: accountsTypes.ACCOUNT_PROFILES_SUCCESS,
	payload,
});

export const accountProfilesFailAction = (payload: {| error: string |}) => ({
	type: accountsTypes.ACCOUNT_PROFILES_FAIL,
	payload,
});


export const accountBalancesReqAction = (payload: typeGetBalancesReqAction) => ({
	type: accountsTypes.ACCOUNT_BALANCES_REQUEST,
	payload,
});

export const accountBalancesReqSuccessAction = (payload: Array<AccountBalance>) => ({
	type: accountsTypes.ACCOUNT_BALANCES_SUCCESS,
	payload,
});

export const accountBalancesFailAction = (payload: {| error: string |}) => ({
	type: accountsTypes.ACCOUNT_BALANCES_FAIL,
	payload,
});

export default null;
