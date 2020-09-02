// @flow

import type {
	PostAccountCreateReq,
	PutAccountUpdateReq,
} from '@base/types/grups';
import type {
	AccountBalance,
	AccountProfile,
	AccountsTable,
	typeGetBalancesReqAction,
	typeGetProfilesReqAction,
} from '@base/store/Accounts/types';

import * as accountsTypes from './constants';

export const accountCreateAction = (payload: PostAccountCreateReq) => ({
	type: accountsTypes.BASE_ACCOUNT_CREATE_REQUEST,
	payload,
});

export const accountCreateActionSuccess = (payload: number) => ({
	type: accountsTypes.BASE_ACCOUNT_CREATE_SUCCESS,
	payload,
});

export const accountCreateActionFail = (payload: {| error: string |}) => ({
	type: accountsTypes.BASE_ACCOUNT_CREATE_FAIL,
	payload,
});

export const accountTableAction = () => ({
	type: accountsTypes.BASE_ACCOUNT_TABLE_REQUEST,
});

export const accountTableActionSuccess = (payload: Array<AccountsTable>) => ({
	type: accountsTypes.BASE_ACCOUNT_TABLE_SUCCESS,
	payload,
});

export const accountTableActionFail = (payload: {| error: string |}) => ({
	type: accountsTypes.BASE_ACCOUNT_TABLE_FAIL,
	payload,
});

export const accountBalancesAction = (payload: typeGetBalancesReqAction) => ({
	type: accountsTypes.BASE_ACCOUNT_BALANCES_REQUEST,
	payload,
});

export const accountBalancesActionSuccess = (payload: Array<AccountBalance>) => ({
	type: accountsTypes.BASE_ACCOUNT_BALANCES_SUCCESS,
	payload,
});

export const accountBalancesActionFail = (payload: {| error: string |}) => ({
	type: accountsTypes.BASE_ACCOUNT_BALANCES_FAIL,
	payload,
});

export const accountProfilesAction = (payload: typeGetProfilesReqAction) => ({
	type: accountsTypes.BASE_ACCOUNT_PROFILES_REQUEST,
	payload,
});

export const accountProfilesActionSuccess = (payload: Array<AccountProfile>) => ({
	type: accountsTypes.BASE_ACCOUNT_PROFILES_SUCCESS,
	payload,
});

export const accountProfilesActionFail = (payload: {| error: string |}) => ({
	type: accountsTypes.BASE_ACCOUNT_PROFILES_FAIL,
	payload,
});

export const accountUpdateAction = (payload: PutAccountUpdateReq) => ({
	type: accountsTypes.BASE_ACCOUNT_UPDATE_REQUEST,
	payload,
});

export const accountUpdateActionSuccess = () => ({
	type: accountsTypes.BASE_ACCOUNT_UPDATE_SUCCESS,
});

export const accountUpdateActionFail = (payload: {| error: string |}) => ({
	type: accountsTypes.BASE_ACCOUNT_UPDATE_FAIL,
	payload,
});


export default null;
