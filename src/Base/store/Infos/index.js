// @flow

import * as infosTypes from '@base/store/Infos/constants';
import type {
	InfosActions,
} from '@base/store/Infos/types';
import type {
	SelectOptions,
} from '@base/types';

export type InfosState = {|
		optionsTestTypes: Array<SelectOptions<string>>,
		defaultRounding: number,
		widthDevice: number,
		heightDevice: number,
		isLoading: boolean,
		error: null | string,
		optionsRequireExtraAuth: Array<string>,
|};

export type InfosActionsType = InfosActions;

const initialState: InfosState = {
	optionsTestTypes: [
		{
			label: 'All',
			value: '',
		},
		{
			label: 'type1',
			value: 'type1',
		},
		{
			label: 'type2',
			value: 'type2',
		},
		{
			label: 'type3',
			value: 'type3',
		},
		{
			label: 'type4',
			value: 'type4',
		},
	],
	widthDevice: 0,
	heightDevice: 0,
	defaultRounding: 8,
	isLoading: false,
	error: null,
	optionsRequireExtraAuth: [],
};

export default (
	state: InfosState = initialState,
	action: InfosActionsType,
): InfosState => {
	switch (action.type) {
		case infosTypes.INFOS_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}

		case infosTypes.INFOS_SUCCESS: {
			const {
				payload,
			} = action;
			return {
				...state,
				...payload,
			};
		}

		case infosTypes.INFOS_FAIL: {
			const {
				payload,
			} = action;
			return {
				...state,
				...payload,
			};
		}

		case infosTypes.INFOS_META: {
			const {
				payload,
			} = action;
			return {
				...state,
				...payload,
			};
		}

		default: {
			return state;
		}
	}
};
