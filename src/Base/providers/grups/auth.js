// @flow
import ApiProviderDefault from '@base/providers/apiProviderDefault';
import type {
	CommonResponse,
} from '@base/types';
import type {
	GetTokenResp,
	GeneralLoginReq,
	PostAutReq,
	CheckTokenReq,
} from '@base/types/grups';

export default class authProvider extends ApiProviderDefault {
	static async postAuth(parameters: {
		body: PostAutReq,
	}) {
		const path = '/auth';
		let body;
		const query = {};
		if (parameters.body === undefined) {
			throw new Error('Missing required  parameter: body');
		}

		if (parameters.body !== undefined) {
			body = parameters.body;
		}

		return this.request<PostAutReq, CommonResponse>(path, 'POST', query, body);
	}

	static async postLogin(parameters: {
		body: GeneralLoginReq,
	}) {
		const path = '/login';
		let body;
		const query = {};
		if (parameters.body === undefined) {
			throw new Error('Missing required  parameter: body');
		}

		if (parameters.body !== undefined) {
			body = parameters.body;
		}

		return this.request<GeneralLoginReq, GetTokenResp>(path, 'POST', query, body);
	}

	static async checkToken(parameters: {
		body: CheckTokenReq,
	}) {
		const path = '/auth/check';
		return this.request<CheckTokenReq, CommonResponse>(path, 'POST', {}, parameters.body);
	}
}
