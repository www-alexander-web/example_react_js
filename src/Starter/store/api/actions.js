// @flow

import actionTypes, {
	type WsConnectAction,
} from './actionTypes';

export const request = <T: string, P>(defaultType: T, payload: P) => ({
	type: `${defaultType}_REQUEST`,
	payload,
});

export const success = <T: string, P>(defaultType: T, payload: P) => ({
	type: `${defaultType}_SUCCESS`,
	payload,
});

export const error = <T: string, E>(defaultType: T, err: E) => ({
	type: `${defaultType}_ERROR`,
	payload: err,
	err,
});

export const reset = <T: string>(defaultType: T) => ({
	type: `${defaultType}_RESET`,
});

export const connectToWs = (payload: string): WsConnectAction => ({
	type: actionTypes.WS_CONNECT,
	payload,
});

export const disconnectWs = () => ({
	type: 'WS_DISCONNECT',
});

export default {
	request,
	success,
	error,
	reset,
};
