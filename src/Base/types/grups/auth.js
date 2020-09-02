// @flow
import type {
	CommonResponse,
	ErrorResponse,
} from '@base/types';

export type GeneralLoginReq = {
	authCode: number,
	email: string,
	password: string,
};

export type HelpersLoginResp = {
	expiresAt: string,
	token: string,
	type: string,
};

export type GetTokenResp = {
	...CommonResponse,
	token: HelpersLoginResp,
} | ErrorResponse;

export type PostAutReq = {
	email: string,
	password: string,
};

export type CheckTokenReq = {
	token: string,
};
export type CheckTokenRes = {};
