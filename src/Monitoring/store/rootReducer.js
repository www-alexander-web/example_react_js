// @flow

import {
	type Reducer,
	combineReducers,
} from 'redux';

import type {
	MonitoringStateClear,
	MonitoringActionsClear,
} from '@mg/types';
import accountsReducer from '@mg/store/Accounts';


const mg: Reducer<MonitoringStateClear, MonitoringActionsClear> = combineReducers({
	accounts: accountsReducer,
});

export default mg;
