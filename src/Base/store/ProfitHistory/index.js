// @flow

import type {
	ProfitsActions,
	ProfitsTable,
} from '@base/store/ProfitHistory/types';
import * as profitsTypes from '@base/store/ProfitHistory/constants';


export type ProfitsState = {|
		data: Array<ProfitsTable>,
		count: number,
		isLoading: boolean,
		error: string | null,
|};

export type ProfitsActionsType = ProfitsActions;

const initialState: ProfitsState = {
	data: [],
	count: 0,
	isLoading: false,
	error: '',
};

export default (
	state: ProfitsState = initialState,
	action: ProfitsActionsType,
): ProfitsState => {
	switch (action.type) {
		case profitsTypes.PROFITS_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}

		case profitsTypes.PROFITS_SUCCESS: {
			const {
				payload: {
					data, count,
				},
			} = action;
			return {
				...state,
				data,
				count,
				isLoading: false,
				error: null,
			};
		}

		case profitsTypes.PROFITS_FAIL: {
			const {
				payload,
			} = action;
			return {
				...state,
				...payload,
				isLoading: false,
			};
		}

		default: {
			return state;
		}
	}
};
