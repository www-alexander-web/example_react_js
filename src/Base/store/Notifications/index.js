// @flow

import * as notificationsTypes from '@base/store/Notifications/constants';
import type {
	TypeNotification,
} from '@base/types';
import type {
	NotificationsActions,
} from '@base/store/Notifications/types';

export type NotificationsState = {|
	message: string,
	type: TypeNotification,
	isUpdate: boolean,
|};

export type NotificationsActionsType = NotificationsActions;

const initialState: NotificationsState = {
	message: '',
	type: 'normal',
	isUpdate: false,
};

export default (
	state: NotificationsState = initialState,
	action: NotificationsActionsType,
): NotificationsState => {
	switch (action.type) {
		case notificationsTypes.SET_NOTIFICATION: {
			const {
				payload,
			} = action;
			return {
				...payload,
				isUpdate: true,
			};
		}

		case notificationsTypes.SET_SUCCESS_NOTIFICATION: {
			const {
				payload,
			} = action;
			return {
				message: payload,
				type: 'success',
				isUpdate: true,
			};
		}

		case notificationsTypes.SET_NORMAL_NOTIFICATION: {
			const {
				payload,
			} = action;
			return {
				message: payload,
				type: 'normal',
				isUpdate: true,
			};
		}

		case notificationsTypes.SET_ERROR_NOTIFICATION: {
			const {
				payload,
			} = action;
			return {
				message: payload,
				type: 'error',
				isUpdate: true,
			};
		}

		case notificationsTypes.GETTING_NOTIFICATION: {
			return {
				...state,
				isUpdate: false,
			};
		}

		case notificationsTypes.RESET_NOTIFICATION: {
			return {
				...initialState,
			};
		}

		default: {
			return state;
		}
	}
};
