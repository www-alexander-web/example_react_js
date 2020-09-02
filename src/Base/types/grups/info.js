// @flow
import type {
	CommonResponse,
	ErrorResponse,
} from '@base/types';


export type GetExchangePairsResp = {|
	...CommonResponse,
	exchangePairs: {
		[string]: Array<string>
	},
	exchangeCoins: {
		[string]: Array<string>
	},
	humanNames: {
		[string]: string,
	},
	rounding: {
    default: number,
    pairs: {
			[key: string]: number
    }
  },
|} | ErrorResponse;

export type GetExchangesResp = {
	...CommonResponse,
	integrated: Array<string>,
	humanNames: {
		[string]: string,
	},
	requireExtraAuth: Array<string>,
} | ErrorResponse;
