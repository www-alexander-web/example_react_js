// @flow

import type {
	ExtractReturn,
} from '@base/utils/utilitiesTypes';
import {
	usersNotificationsRequest,
	usersNotificationsSuccess,
	usersNotificationsFail,
	usersPutRequest,
} from '@base/store/UsersNotifications/actions';

export type UsersItem = {|
  email: string,
  id: number,
  password: string,
  notifications: [
    {
      events?: [string] | null,
      userID: number
    }
  ],
  roleID: number,
|};

export type UsersPutAction = ExtractReturn<typeof usersPutRequest>;

export type UsersAction = ExtractReturn<typeof usersNotificationsRequest>;
export type UsersSuccessAction = ExtractReturn<typeof usersNotificationsSuccess>;
export type UsersFailAction = ExtractReturn<typeof usersNotificationsFail>;


export type UsersNotificationsActions =
	| UsersAction
	| UsersSuccessAction
  | UsersFailAction
  | UsersPutAction
