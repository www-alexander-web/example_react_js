/* eslint-disable no-param-reassign */
// @flow
import {
	eventChannel,
	END,
} from 'redux-saga';
import {
	put,
	call,
	take,
	cancelled,
} from 'redux-saga/effects';
import type {
	Saga,
} from 'redux-saga';

const SERVER_URL = process.env.REACT_APP_REST_API_URL !== ''
	? process.env.REACT_APP_REST_API_URL
	: 'localhost:9002/api';

export function createWebSocketConnection({
	url,
}: {url: string}) {
	// flowlint-next-line unclear-type: off
	return new Promise<any, any>((resolve, reject) => {
		const socket = new WebSocket(`ws://${String(SERVER_URL).replace(/^https?:\/\//i, '')}${url}`);

		socket.onopen = () => {
			resolve(socket);
		};

		socket.onerror = (evt) => {
			reject(evt);
		};
	});
}

export function createSocketChannel(socket: WebSocket) {
	// flowlint-next-line unclear-type: off
	return eventChannel<any>((emit) => {
		socket.onmessage = (event) => {
			emit(event.data);
		};

		socket.onclose = () => {
			emit(END);
		};

		const unsubscribe = () => {
			// $FlowFixMe
			socket.onmessage = null;
		};

		return unsubscribe;
	});
}


export function* listenForSocketMessages<T>({
	url,
	sendFunction,
	errorFunction,
	params,
}: {
    url: string,
    // flowlint-next-line unclear-type: off
    sendFunction: (obj: T) => {},
    errorFunction: ({| error: string |}) => {},
	// $FlowFixMe
	params?: any
  }): Saga<void> {
	let socket;
	let socketChannel;

	try {
		socket = yield call(createWebSocketConnection, {
			url,
		});
		socketChannel = yield call(createSocketChannel, socket);
		while (true) {
			const payload = yield take(socketChannel);
			const allParams = {
				data: JSON.parse(payload),
				params,
			};
			// yield call(sendFunction, JSON.parse(payload), params);
			// $FlowFixMe
			yield call(sendFunction, allParams);
		}
	} catch (error) {
		yield put(errorFunction({
			error: error.message,
		}));
	} finally {
		if (yield cancelled()) {
			// $FlowFixMe
			socketChannel.close();

			// $FlowFixMe
			socket.close();
		} else {
			yield put(errorFunction({
				error: 'Error while connecting to the WebSocket',
			}));
		}
	}
}
