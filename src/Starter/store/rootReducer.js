// @flow

/**
 * Combine all reducers in this file and export the combined reducers.
 */

import {
	type Reducer,
	combineReducers,
} from 'redux';

import base,
{
	router,
} from '@base/store/rootReducer';

import mg from '@mg/store/rootReducer';


export default <S: {...}, A>(): Reducer<S, A> => combineReducers({
	router,
	base,
	mg,
});
