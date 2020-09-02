// @flow
import ApiProviderDefault from '@base/providers/apiProviderDefault';
import type {
	GetAccountProfilesResp,
	GetAccountsResp,
	PostAccountCreateReq,
	PostAccountCreateResp,
	PutAccountUpdateReq,
	PutAccountUpdateResp,
} from '@base/types/grups';

export default class AccountsProvider extends ApiProviderDefault {
	static async getAccounts(parameters: {
	name?: string,
	userId?: string,
	headers: Headers,
}): Promise<GetAccountsResp> {
		const path = '/accounts';
		let body;
		let headers;
		const query = {};

		if (parameters.name !== undefined) {
			query.name = parameters.name;
		}

		if (parameters.userId !== undefined) {
			query.userID = parameters.userId;
		}

		if (parameters.headers === undefined) {
			throw new Error('Missing required  parameter: headers');
		}

		if (parameters.headers !== undefined) {
			headers = parameters.headers;
		}

		return this.request(path, 'GET', query, body, headers);
	}

	static async getAccountProfiles(parameters: {
	userId?: number,
	headers: Headers,
}): Promise<GetAccountProfilesResp> {
		let userId = 0;
		let body;
		let headers;
		const query = {};
		if (parameters.userId !== undefined) {
			userId = parameters.userId;
		}
		if (parameters.headers === undefined) {
			throw new Error('Missing required  parameter: headers');
		}

		if (parameters.headers !== undefined) {
			headers = parameters.headers;
		}

		const path = `/profiles/account/${userId}`;
		return this.request(path, 'GET', query, body, headers);
	}


	static async postAccountCreate(parameters: {
	req: PostAccountCreateReq,
	headers: Headers,
}): Promise<PostAccountCreateResp> {
		let body;
		let headers;
		const query = {};
		if (parameters.req !== undefined) {
			body = parameters.req;
		}
		if (parameters.headers === undefined) {
			throw new Error('Missing required  parameter: headers');
		}

		if (parameters.headers !== undefined) {
			headers = parameters.headers;
		}

		const path = '/account/create';
		return this.request(path, 'POST', query, body, headers);
	}

	static async putAccountUpdate(parameters: {
	req: PutAccountUpdateReq,
	headers: Headers,
}): Promise<PutAccountUpdateResp> {
		let body;
		let headers;
		const query = {};
		if (parameters.req !== undefined) {
			body = parameters.req;
		}
		if (parameters.headers === undefined) {
			throw new Error('Missing required  parameter: headers');
		}

		if (parameters.headers !== undefined) {
			headers = parameters.headers;
		}

		const path = '/account/update';
		return this.request(path, 'PUT', query, body, headers);
	}
}

AccountsProvider.getAccounts.security = true;
AccountsProvider.getAccountProfiles.security = true;
AccountsProvider.postAccountCreate.security = true;
AccountsProvider.putAccountUpdate.security = true;
