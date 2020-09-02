// @flow
// flowlint unclear-type:off
import {
	type MiddlewareAPI,
} from 'redux';
import {
	TypeSocket,
} from 'typesocket';


import actionTypes from '../api/actionTypes';

const SERVER_URL = process.env.REACT_APP_REST_API_URL !== ''
	? process.env.REACT_APP_REST_API_URL
	: 'localhost:9002/api';
const WS_BASE_URL = `ws://${String(SERVER_URL).replace(/^https?:\/\//i, '')}/ws`;

const WS_PINGPONG_MS = 30000;
const WS_PINGPONG_MSG = 'Hello guys!';

const socketMiddleware = () => {
	let socket = null;
	// eslint-disable-next-line consistent-return
	return (store: MiddlewareAPI<any, any>) => (next: (action: any) => void) => (action: any) => {
		switch (action.type) {
			case actionTypes.WS_CONNECT:
				if (socket) socket.disconnect();
				socket = new TypeSocket(`${WS_BASE_URL}/${action.payload}`);
				socket.connect();


				socket.on('connected', () => {
					store.dispatch({
						type: actionTypes.WS_CONNECTED,
					});
				});

				setInterval(() => {
					if (socket && socket.readyState === 1) socket.send(WS_PINGPONG_MSG);
				}, WS_PINGPONG_MS);

				socket.on('message', (message) => {
					store.dispatch({
						type: actionTypes.WS_MESSAGE,
						data: {
							url: action.payload,
							value: message,
						},
					});
				});

				socket.on('disconnected', () => {
					store.dispatch({
						type: actionTypes.WS_DISCONNECTED,
					});
				});

				break;
			default:
				return next(action);
		}
	};
};

export default socketMiddleware;
