// @flow

// import * as accountsTypes from './constants';
import * as accountsTypes from '@mg/store/Accounts/constants';

import type {
	AccountsAccount,
	AccountProfile,
	AccountsActions,
	AccountBalance,
} from './types';

export type AccountsState = {|
	accounts: {
		data: Array<AccountsAccount>,
		isLoading: boolean,
		error: null | string,
	},
	accountProfiles: {
		data: Array<AccountProfile>,
		isLoading: boolean,
		error: null | string,
	},
	accountBalances: {
		data: Array<AccountBalance>,
		isLoading: boolean,
		error: null | string,
	},
|};
export type AccountsActionsType = AccountsActions;

const initialState: AccountsState = {
	accounts: {
		data: [],
		isLoading: false,
		error: null,
	},
	accountProfiles: {
		data: [],
		isLoading: false,
		error: null,
	},
	accountBalances: {
		data: [],
		isLoading: false,
		error: null,
	},
};

export default (
	state: AccountsState = initialState,
	action: AccountsActions,
): AccountsState => {
	switch (action.type) {
		// ...place case statements here...
		case accountsTypes.ACCOUNTS_REQUEST: {
			return {
				...state,
				accounts: {
					...state.accounts,
					isLoading: true,
				},
			};
		}
		case accountsTypes.ACCOUNTS_SUCCESS: {
			const {
				payload,
			} = action;
			return {
				...state,
				accounts: {
					...state.accounts,
					data: payload,
					isLoading: false,
					error: null,
				},
			};
		}

		case accountsTypes.ACCOUNTS_FAIL: {
			const {
				payload,
			} = action;
			return {
				...state,
				accounts: {
					...state.accounts,
					...payload,
					isLoading: false,
				},
			};
		}
		/* **************** */
		case accountsTypes.ACCOUNT_PROFILES_REQUEST: {
			return {
				...state,
				accountProfiles: {
					...state.accountProfiles,
					isLoading: true,
				},
			};
		}
		case accountsTypes.ACCOUNT_PROFILES_SUCCESS: {
			const {
				payload,
			} = action;
			return {
				...state,
				accountProfiles: {
					...state.accountProfiles,
					data: payload,
					isLoading: false,
					error: null,
				},
			};
		}

		case accountsTypes.ACCOUNT_PROFILES_FAIL: {
			const {
				payload,
			} = action;
			return {
				...state,
				accountProfiles: {
					...state.accountProfiles,
					...payload,
					isLoading: false,
				},
			};
		}
		/* **************** */
		case accountsTypes.ACCOUNT_BALANCES_REQUEST: {
			return {
				...state,
				accountBalances: {
					...state.accountBalances,
					isLoading: true,
				},
			};
		}
		case accountsTypes.ACCOUNT_BALANCES_SUCCESS: {
			const {
				payload,
			} = action;
			return {
				...state,
				accountBalances: {
					...state.accountBalances,
					data: payload,
					isLoading: false,
					error: null,
				},
			};
		}

		case accountsTypes.ACCOUNT_BALANCES_FAIL: {
			const {
				payload,
			} = action;
			return {
				...state,
				accountBalances: {
					...state.accountBalances,
					...payload,
					isLoading: false,
				},
			};
		}
		default: {
			return state;
		}
	}
};
