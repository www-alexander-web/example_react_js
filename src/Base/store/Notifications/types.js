// @flow

import type {
	ExtractReturn,
} from '@base/utils/utilitiesTypes';
import {
	setNotification,
	resetNotification,
	setSuccessNotification,
	setNormalNotification,
	setErrorNotification,
	gettingNotification,
} from '@base/store/Notifications/actions';

export type SetNotification = ExtractReturn<typeof setNotification>;
export type SetSuccessNotification = ExtractReturn<typeof setSuccessNotification>;
export type SetNormalNotification = ExtractReturn<typeof setNormalNotification>;
export type SetErrorNotification = ExtractReturn<typeof setErrorNotification>;
export type ResetNotification = ExtractReturn<typeof resetNotification>;
export type GettingNotification = ExtractReturn<typeof gettingNotification>;

export type NotificationsActions =
	| SetNotification
	| SetSuccessNotification
	| SetNormalNotification
	| SetErrorNotification
	| ResetNotification
	| GettingNotification;
