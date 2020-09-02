// @flow
import type {
	CommonResponse,
	ErrorResponse,
	SelectOptions,
	TypeJSON,
} from '@base/types';


export type GetProfileItem = {|
	accountIDs: {
    [string]: number
	},
	accounts: {
		[string]: {
			createdAt: string,
			exchange: string,
			id: number,
			name: string,
			userEmail: string,
			userID: number,
		},
	},
	bot: string,
	createdAt: string,
	description: string,
	id: number,
	lastStartTime: string,
	name: string,
	sessionID: string,
	settings: TypeJSON,
	userEmail: string,
	userID: number,
	windowSize: number,
|};

export type GetProfilesResp = {
	...CommonResponse,
	profiles?: Array<GetProfileItem>,
} | ErrorResponse;


export type PutProfilesUpdateReq = {
	accountID: number,
	apiKey: string,
	extra: string,
	name: string,
	secretKey: string,
};

export type PostProfilesCreateReq = {|
	accountIDs: Array<number>,
	availableCoins: Array<string>,
	chartOptions: {
		bollingerBands: {
			mult: number,
			n: number,
		},
		sma: {
			n: number,
		},
		windowSize: number,
	},
	description: string,
	name: string,
	maxOrderAmountInBTC: number,
	orderType: string,
	stakeOfTotalFunds: number,
|};

export type PostProfilesCreateResp = {
	...CommonResponse,
	id?: number,
} | ErrorResponse;


export type DeleteProfilesReq = number;

export type DeleteProfilesResp = {
	...CommonResponse,
} | ErrorResponse;


export type GetProfilesBotReq = {
	botType: string,
};

export type ProfileBot = {
	accountIDs: {
		[string]: number,
	},
	accounts: {
		[string]: {
			createdA: string,
			exchange: string,
			id: number,
			name: string,
			userEmail: string,
			userID: number
		},
	},
	bot: string,
	createdAt: string,
	description: string,
	id: number,
	lastStartTime: string,
	name: string,
	sessionID: string,
	settings: {
		stakeOfTotalFunds: number,
		maxOrderAmountInBTC: number,
		orderType: string,
		availableCoins: Array<SelectOptions<string>>,
		calcSettings: {
			bollingerBands: {
				mult: number,
				n: number
			},
			sma: {
				n: number
			}
		},
	},
	userEmail: string,
	userID: number,
	windowSize: number,
	service: boolean,
};


export type GetProfilesBotResp = {
	...CommonResponse,
	profiles: Array<ProfileBot>,
} | ErrorResponse;

export type PostProfilesCreateMeReq = {|
	accountIDs: Array<number>,
	chartOptions: {
		bollingerBands: {
			mult: number,
			n: number,
		},
		sma: {
			n: number,
		},
		windowSize: number,
	},
	description: string,
	name: string,
|};

export type PostProfilesCreateEarbReq = {|
	accountIDs: Array<number>,
	availableCoins: Array<string>,
	chartOptions: {
		bollingerBands: {
			mult: number,
			n: number,
		},
		sma: {
			n: number,
		},
		windowSize: number,
	},
	description: string,
	name: string,
	maxOrderAmountInBTC: number,
	orderType: string,
	stakeOfTotalFunds: number,
|};

export type PostProfilesCreateTarbReq = {|
	accountIDs: Array<number>,
	availableCoins: Array<string>,
	chartOptions: {
		bollingerBands: {
			mult: number,
			n: number,
		},
		sma: {
			n: number,
		},
		windowSize: number,
	},
	description: string,
	name: string,
	maxOrderAmountInBTC: number,
	orderType: string,
	stakeOfTotalFunds: number,
|};


export type PostProfilesCreateMmReq = {|
	accountIDs: Array<number>,
	description: string,
	mmOptions: {
		cycleDelay: number,
		positionDelay: number
	},
	name: string,
|};

export type UpdateBotRes = {
	[string]: number | string | boolean
};
