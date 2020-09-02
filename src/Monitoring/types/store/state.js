// @flow
import type {
	BaseState,
} from '@base/types';

import type {
	AccountsState,
} from '@mg/store/Accounts';

export type MonitoringState = {|
	...BaseState,
	mg: {|
	accounts: AccountsState,
	|},
|};

export type MonitoringStateClear = {|
	mg: {|
	accounts: AccountsState,
	|}
|};
