// @flow
import ApiProviderDefault from '@base/providers/apiProviderDefault';
import type {
	GetExchangePairsResp,
	GetExchangesResp,
} from '@base/types/grups';

export default class InfoProvider extends ApiProviderDefault {
	static async getInfosPairs(parameters: {
		headers: Headers,
	}): Promise<GetExchangePairsResp> {
		const path = '/info/test2';
		let body;
		let headers;
		const query = {};

		if (parameters.headers !== undefined) {
			headers = parameters.headers;
		}

		return this.request(path, 'GET', query, body, headers);
	}

	static async getInfosExchanges(parameters: {
		headers: Headers,
	}): Promise<GetExchangesResp> {
		const path = '/info/test';
		let body;
		let headers;
		const query = {};

		if (parameters.headers !== undefined) {
			headers = parameters.headers;
		}

		return this.request(path, 'GET', query, body, headers);
	}
}

InfoProvider.getInfosPairs.security = true;
