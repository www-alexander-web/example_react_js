
// @flow
// eslint-disable-next-line import/no-extraneous-dependencies
import configureMockStore from 'redux-mock-store';

import type {
	BaseState,
} from '@base/types';

export const storeMockBase: BaseState = {
	router: {
		location: {
			pathname: '',
			search: '',
			hash: '',
			state: null,
			key: '0gvqtf',
		},
		action: 'POP',
	},
	base: {
		auth: {
			isLoading: false,
			isAuth: true,
			email: '',
			password: '',
			error: '',
			token: {
				token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiIsInJvbGVJRCI6MSwidXNlcklEIjoxLCJleHAiOjE1ODg4NTk0NDksImp0aSI6IjFiWWs3bjhBUGdIdVljWDQwaGJ2YVJqWE5PdiIsInN1YiI6ImFjY2VzcyJ9.qPkgonPUKL6fvyUawR3QPDl-ceA8-sKuor-SkYd1Hqg',
				expiresAt: 1588859449000,
			},
		},
		infos: {
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
		},
		notifications: {
			message: '',
			type: 'normal',
			isUpdate: false,
		},
		modal: {
			modalComponent: null,
			isOpen: false,
		},
		users: {
			users: {
				data: [],
				update: [],
				notifications: [],
				isLoading: false,
				error: null,
			},
		},
		ui: {
			CHECK_TOKEN: 'INIT',
		},
		components: {
			accounts: {
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
				profiles: {
					data: [],
					isLoading: false,
					error: null,
				},
				balances: {
					data: [],
					isLoading: false,
					error: null,
				},
				update: {
					isLoading: false,
					error: null,
				},
			},
			profiles: {
				list: {
					data: [],
					isLoading: false,
					error: null,
				},
				delete: {
					isLoading: false,
					error: null,
				},
				change: {
					id: null,
				},
			},
			profits: {
				data: [],
				count: 0,
				isLoading: false,
				error: '',
			},
		},
	},
};

const middleware = [];
const mockStore = configureMockStore(middleware);
// $FlowFixMe
const data = mockStore(storeMockBase);
export default data;
