// @flow

import * as accountsTypes from './constants';
import type {
	AccountBalance,
	AccountProfile,
	AccountsActions,
	AccountsTable,
} from './types';

export type AccountsState = {|
	create: {
			id: number,
			isLoading: boolean,
			error: string | null,
	},
	table: {
		data: Array<AccountsTable>,
		isLoading: boolean,
		error: string | null,
  },
		balances: {
				data: Array<AccountBalance>,
				isLoading: boolean,
				error: string | null,
		},
		profiles: {
				data: Array<AccountProfile>,
				isLoading: boolean,
				error: string | null,
		},
		update: {
				isLoading: boolean,
				error: string | null,
		}
|};

export type AccountsActionsType = AccountsActions;

const initialState: AccountsState = {
	create: {
		id: 0,
		isLoading: false,
		error: null,
	},
	table: {
		data: [],
		isLoading: false,
		error: null,
	},
	balances: {
		data: [],
		isLoading: false,
		error: null,
	},
	profiles: {
		data: [],
		isLoading: false,
		error: null,
	},
	update: {
		isLoading: false,
		error: null,
	},
};

export default (
	state: AccountsState = initialState,
	action: AccountsActionsType,
): AccountsState => {
	switch (action.type) {
		case accountsTypes.BASE_ACCOUNT_CREATE_REQUEST: {
			return {
				...state,
				create: {
					...state.create,
					isLoading: true,
					error: null,
				},
			};
		}

		case accountsTypes.BASE_ACCOUNT_CREATE_SUCCESS: {
			const {
				payload,
			} = action;
			return {
				...state,
				create: {
					...state.create,
					isLoading: false,
					id: payload,
					error: null,
				},
			};
		}

		case accountsTypes.BASE_ACCOUNT_CREATE_FAIL: {
			const {
				payload,
			} = action;
			return {
				...state,
				create: {
					...state.create,
					...payload,
				},
			};
		}

		case accountsTypes.BASE_ACCOUNT_TABLE_REQUEST: {
			return {
				...state,
				table: {
					...state.table,
					isLoading: true,
				},
			};
		}

		case accountsTypes.BASE_ACCOUNT_TABLE_SUCCESS: {
			const {
				payload,
			} = action;
			return {
				...state,
				table: {
					...state.table,
					isLoading: false,
					data: payload,
					error: null,
				},
			};
		}

		case accountsTypes.BASE_ACCOUNT_TABLE_FAIL: {
			const {
				payload,
			} = action;
			return {
				...state,
				table: {
					...state.table,
					...payload,
				},
			};
		}

		case accountsTypes.BASE_ACCOUNT_BALANCES_REQUEST: {
			return {
				...state,
				balances: {
					...state.balances,
					isLoading: true,
				},
			};
		}

		case accountsTypes.BASE_ACCOUNT_BALANCES_SUCCESS: {
			const {
				payload,
			} = action;
			return {
				...state,
				balances: {
					...state.balances,
					isLoading: false,
					data: payload,
					error: null,
				},
			};
		}

		case accountsTypes.BASE_ACCOUNT_BALANCES_FAIL: {
			const {
				payload,
			} = action;
			return {
				...state,
				balances: {
					...state.balances,
					...payload,
				},
			};
		}

		case accountsTypes.BASE_ACCOUNT_PROFILES_REQUEST: {
			return {
				...state,
				profiles: {
					...state.profiles,
					isLoading: true,
				},
			};
		}

		case accountsTypes.BASE_ACCOUNT_PROFILES_SUCCESS: {
			const {
				payload,
			} = action;
			return {
				...state,
				profiles: {
					...state.profiles,
					isLoading: false,
					data: payload,
					error: null,
				},
			};
		}

		case accountsTypes.BASE_ACCOUNT_PROFILES_FAIL: {
			const {
				payload,
			} = action;
			return {
				...state,
				profiles: {
					...state.profiles,
					...payload,
				},
			};
		}

		case accountsTypes.BASE_ACCOUNT_UPDATE_REQUEST: {
			return {
				...state,
				update: {
					...state.update,
					isLoading: true,
				},
			};
		}

		case accountsTypes.BASE_ACCOUNT_UPDATE_SUCCESS: {
			return {
				...state,
				update: {
					...state.update,
					isLoading: false,
					error: null,
				},
			};
		}

		case accountsTypes.BASE_ACCOUNT_UPDATE_FAIL: {
			const {
				payload,
			} = action;
			return {
				...state,
				update: {
					...state.update,
					...payload,
				},
			};
		}

		default: {
			return state;
		}
	}
};
