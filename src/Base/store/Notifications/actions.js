// @flow

import * as notificationsTypes from '@base/store/Notifications/constants';
import type {
	TypeNotification,
} from '@base/types';

export const setNotification = (payload: {| message: string, type: TypeNotification |}) => ({
	type: notificationsTypes.SET_NOTIFICATION,
	payload,
});

export const setSuccessNotification = (payload: string = 'All changes were applied.') => ({
	type: notificationsTypes.SET_SUCCESS_NOTIFICATION,
	payload,
});

export const setNormalNotification = (payload: string = 'All changes were applied.') => ({
	type: notificationsTypes.SET_NORMAL_NOTIFICATION,
	payload,
});

export const setErrorNotification = (payload: string = 'An error occurred.') => ({
	type: notificationsTypes.SET_ERROR_NOTIFICATION,
	payload: payload === '' || payload === undefined || payload === null || payload === 'Unknown error' ? 'An error occurred.' : payload,
});


export const gettingNotification = () => ({
	type: notificationsTypes.GETTING_NOTIFICATION,
});

export const resetNotification = () => ({
	type: notificationsTypes.RESET_NOTIFICATION,
});
