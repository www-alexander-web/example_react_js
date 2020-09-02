// @flow

import type {
	UsersItem,
	PutUsersItem,
	PutUsersBotReq,
} from '@base/types/grups';
import * as usersNotificationsTypes from '@base/store/UsersNotifications/constants';


export const usersNotificationsRequest = () => ({
	type: usersNotificationsTypes.USERS_NOTIFICATIONS_REQUEST,
});

export const usersNotificationsSuccess = (payload: Array<UsersItem>) => ({
	type: usersNotificationsTypes.USERS_NOTIFICATIONS_SUCCESS,
	payload,
});

export const usersNotificationsFail = (payload: {| error: string |}) => ({
	type: usersNotificationsTypes.USERS_NOTIFICATIONS_FAIL,
	payload,
});

export const usersPutRequest = (payload: {|data: PutUsersItem, bot: PutUsersBotReq|}) => ({
	type: usersNotificationsTypes.USERS_PUT_REQUEST,
	payload,
});

export const usersPutSuccess = () => ({
	type: usersNotificationsTypes.USERS_PUT_SUCCESS,
});

export const usersPutFail = (payload: {| error: string |}) => ({
	type: usersNotificationsTypes.USERS_PUT_FAIL,
	payload,
});

export const usersNotificationsUpdate = (payload: {|
	userId: number,
	notificationName: string,
	botType: string,
	newValue: boolean
	|}) => ({
	type: usersNotificationsTypes.USERS_NOTIFICATIONS_UPDATE,
	payload,
});

export const usersUpdatedDataReset = () => ({
	type: usersNotificationsTypes.USERS_NOTIFICATIONS_RESET,
});

export default null;
