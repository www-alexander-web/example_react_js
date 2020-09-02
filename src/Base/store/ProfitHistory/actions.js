// @flow

import type {
	ProfitsTable,
} from '@base/store/ProfitHistory/types';
import type {
	PostProfitsReq,
} from '@base/types/grups';
import * as profitsTypes from '@base/store/ProfitHistory/constants';


export const profitsRequest = (payload: PostProfitsReq) => ({
	type: profitsTypes.PROFITS_REQUEST,
	payload,
});

export const profitsSuccess = (payload: {|data: Array<ProfitsTable>, count: number|}) => ({
	type: profitsTypes.PROFITS_SUCCESS,
	payload,
});

export const profitsFail = (payload: {| error: string |}) => ({
	type: profitsTypes.PROFITS_FAIL,
	payload,
});

export default null;
