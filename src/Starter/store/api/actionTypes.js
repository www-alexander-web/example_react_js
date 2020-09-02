// @flow

import { type Action } from '@starter/types';

export type WsConnectAction = Action<'WS_CONNECT', string>;
export type WsConnectedAction = Action<'WS_CONNECTED'>;
export type WsDisconnectedAction = Action<'WS_DISCONNECTED'>;
export type WsMessageAction = Action<'WS_MESSAGE'>;
export type WsSendMessageAction = Action<'WS_SEND_MESSAGE'>;

export type WsAction = WsConnectAction
	| WsConnectedAction
	| WsDisconnectedAction
	| WsMessageAction
	| WsSendMessageAction;


export default {
	WS_CONNECT: 'WS_CONNECT',
	WS_CONNECTED: 'WS_CONNECTED',
	WS_DISCONNECTED: 'WS_DISCONNECTED',
	WS_MESSAGE: 'WS_MESSAGE',
	WS_SEND_MESSAGE: 'WS_SEND_MESSAGE',
};
