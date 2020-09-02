// @flow
import type {
	CommonResponse,
	ErrorResponse,
} from '@base/types';

export type UsersItem = {|
  email: string,
  password: string,
  id: number,
  notifications: [
    {
      events?: [string] | null,
      userID: number
    }
  ],
  roleID: number,
|};

export type GetUsersResp = {
	...CommonResponse,
	users: Array<UsersItem>,
} | ErrorResponse;

export type PutUsersItem = {|
  notifications: [
      {
        events?: [string] | null,
        userID: number
      }
    ]
|};

export type PutUsersBotStatusesReq = {
  notifications: PutUsersItem,
};

export type PutUsersBotReq = {|
	type: string,
|};

export type PutUsersUpdateResp = {
	...CommonResponse,
} | ErrorResponse;
