// @flow

import { uiReducer } from '@starter/utils';

import type { UIState } from '@base/types';

import type { UIAction } from './actions';

const initialState: UIState = {
	CHECK_TOKEN: 'INIT',
};

/* eslint-disable arrow-body-style */
export default (state: UIState = initialState, action: UIAction): UIState => {
	return uiReducer<UIState, UIAction>(state, initialState, action);
};
