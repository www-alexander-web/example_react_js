// @flow
import axios from 'axios';

import type {
	ErrorResponse,
} from '@base/types';

const requireCodes = [
	200,
	400,
	401,
	403,
	500,
];

const axiosInstance = axios.create({
	baseURL:
	// process.env.REACT_APP_REST_API_URL !== ''
	// 	? process.env.REACT_APP_REST_API_URL
	// 	:
'/api',
	validateStatus: (status) => requireCodes.includes(status),
});

export default class ApiProviderDefault {
	static request<T, R>(
		url: string,
		method: 'POST'
			| 'GET'
			| 'PUT'
			| 'DELETE'
			| 'OPTIONS'
			| 'HEAD'
			| 'PATCH',
		params: { [string]: mixed, ... },
		data?: T,
		headers?: Headers,
	): Promise<R | ErrorResponse> {
		return axiosInstance<T, R>({
			url,
			method,
			params,
			data,
			headers,
		})
			.then((response) => response.data)
			.catch((error) => ({
				success: false,
				error: error.message,
			}));
	}
}
