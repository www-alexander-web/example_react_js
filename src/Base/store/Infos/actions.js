// @flow

import * as infosTypes from '@base/store/Infos/constants';
import type {
	SelectOptions,
} from '@base/types';

export const infosAction = () => ({
	type: infosTypes.INFOS_REQUEST,
});

export const infosSuccessAction = (payload: {|
	coins: {[string]: string},
	exchanges: {[string]: string},
	exchangesIntegrated: Array<string>,
	exchangePairs: {[string]: Array<string>},
	optionsExchange: Array<SelectOptions<string>>,
	exchangeCoins: {[string]: Array<string>},
	optionsCoins: {
		[string]: Array<SelectOptions<string>>
	},
	optionsCoin: Array<SelectOptions<string>>,
	optionsPair: {
		[string]: Array<SelectOptions<string>>
	},
	rounding: {
			[key: string]: number
	},
	defaultRounding: number,
	optionsRequireExtraAuth: Array<string>,
|}) => ({
	type: infosTypes.INFOS_SUCCESS,
	payload,
});

export const infosFailAction = (payload: {| error: string |}) => ({
	type: infosTypes.INFOS_FAIL,
	payload,
});


export const changeMeta = (payload: {|
	widthDevice: number,
	heightDevice: number,
|}) => ({
	type: infosTypes.INFOS_META,
	payload,
});

export default null;
