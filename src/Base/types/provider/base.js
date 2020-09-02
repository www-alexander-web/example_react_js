// @flow

export type Headers = { [header: string]: mixed, ... };

export type CommonResponse = {|
	success: boolean,
	error?: string,
|};

export type ErrorResponse = {|
	success: false,
	error: string,
|};
