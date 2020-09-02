// @flow
import _ from 'lodash';

import type {
	UsersNotificationsActions,
} from '@base/store/UsersNotifications/types';
import * as usersNotificationsTypes from '@base/store/UsersNotifications/constants';
import type {
	UsersItem,
} from '@base/types/grups';

export type UsersNotificationsState = {|
	users: {
		data: Array<UsersItem>,
		update: Array<UsersItem>,
		notifications: [],
		isLoading: boolean,
		error: string | null,
	},
|};

export type UsersNotificationsActionsType = UsersNotificationsActions;

const initialState: UsersNotificationsState = {
	users: {
		data: [],
		update: [],
		notifications: [],
		isLoading: false,
		error: null,
	},
};

export default (
	state: UsersNotificationsState = initialState,
	action: UsersNotificationsActionsType,
): UsersNotificationsState => {
	switch (action.type) {
		case usersNotificationsTypes.USERS_NOTIFICATIONS_REQUEST: {
			return {
				...state,
				users: {
					...initialState.users,
					isLoading: true,
				},
			};
		}

		case usersNotificationsTypes.USERS_NOTIFICATIONS_SUCCESS: {
			const {
				payload,
			} = action;
			return {
				...state,
				users: {
					...initialState.users,
					data: payload,
					update: payload,
					isLoading: false,
					error: null,
				},
			};
		}

		case usersNotificationsTypes.USERS_NOTIFICATIONS_FAIL: {
			const {
				payload,
			} = action;
			return {
				...state,
				users: {
					...initialState.users,
					...payload,
					isLoading: false,
				},
			};
		}

		case usersNotificationsTypes.USERS_PUT_REQUEST: {
			return {
				...state,
				users: {
					...state.users,
					isLoading: true,
				},
			};
		}

		case usersNotificationsTypes.USERS_PUT_SUCCESS: {
			return {
				...state,
				users: {
					...state.users,
					isLoading: true,
				},
			};
		}

		case usersNotificationsTypes.USERS_PUT_FAIL: {
			const {
				payload,
			} = action;
			return {
				...state,
				users: {
					...state.users,
					...payload,
				},
			};
		}

		case usersNotificationsTypes.USERS_NOTIFICATIONS_UPDATE: {
			const {
				userId, notificationName, botType, newValue,
			} = action.payload;
			const newId = state.users.update.findIndex((el) => el.id === userId);
			const updatedUsersData = [
				...state.users.update,
			];

			const updatedEvents = updatedUsersData[newId].notifications[botType];
			let newEvents;

			if (
				updatedEvents === undefined
			) {
				newEvents = [
					notificationName,
				];
			} else if (
				newValue
			) {
				newEvents = updatedEvents
				// $FlowFixMee
					.filter((str) => str !== notificationName);
			} else {
				newEvents = [
					// $FlowFixMee
					...updatedEvents,
					notificationName,
				];
			}

			// Object from 'data' in which the switcher is changed
			updatedUsersData[newId] = {
				...updatedUsersData[newId],
				notifications: {
					// $FlowFixMee
					...updatedUsersData[newId].notifications,
					[botType]: newEvents,
				},
			};
			// Array with values from object 'data.notifications' for all users after GET request
			const initialValueSwitch = state.users.data.map((item) => (
				{
					userID: item.id,
					events: item.notifications[botType],
				})).filter((el) => el.events !== undefined);

			// Array with values from object 'data.notifications' for all users after change the values of the switchers
			const changeValueSwitch = updatedUsersData.map((item) => (
				{
					userID: item.id,
					events: item.notifications[botType],
				})).filter((el) => el.events !== undefined);

			// Common array of initial and modified values of object 'data.notifications'
			const commonValueSwitch = [
				...initialValueSwitch,
				...changeValueSwitch,
			];
			// Array of 'id' of unchanged objects from array 'commonValueSwitch'
			// Match to switchers for which the user has NOT changed position
			// $FlowFixMee
			const idNotChangeSwitch = _.difference(commonValueSwitch, _.uniqBy(commonValueSwitch, 'userID' && 'events'), 'userID').map((el) => el.userID);
			// Array with changed values from object "data.notifications"
			// Match to switchers for which the user has changed position
			const updateValueSwitch = changeValueSwitch.filter((el) => !idNotChangeSwitch.includes(el.userID));

			return {
				...state,
				users: {
					...state.users,
					update: updatedUsersData,
					// $FlowFixMee
					notifications: updateValueSwitch,
				},
			};
		}

		case usersNotificationsTypes.USERS_NOTIFICATIONS_RESET: {
			return {
				...state,
				users: {
					...state.users,
					notifications: [],
				},
			};
		}
		default: {
			return state;
		}
	}
};
