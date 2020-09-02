
// @flow
// eslint-disable-next-line import/no-extraneous-dependencies
import configureMockStore from 'redux-mock-store';

import {
	storeMockBase,
} from '@base/store/storeMock';

import type {
	MonitoringState,
} from '@mg/types';

export const storeMockLp: MonitoringState = {
	...storeMockBase,
	mg: {
		accounts: {
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
		},
	},
};

const middleware = [];
const mockStore = configureMockStore(middleware);
// $FlowFixMe
const data = mockStore(storeMockLp);
export default data;
