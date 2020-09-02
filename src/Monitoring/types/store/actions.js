// @flow

import type {
	Dispatch,
} from 'redux';

import type {
	BaseActions,
} from '@base/types';

import type {
	AccountsActionsType,
} from '@mg/store/Accounts';

export type MonitoringActions =
  | BaseActions
	| AccountsActionsType

export type MonitoringActionsClear =
| AccountsActionsType

export type MonitoringDispatch = Dispatch<MonitoringActions>;
