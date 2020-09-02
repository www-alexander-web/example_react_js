// @flow

import type {
	Dispatch,
} from 'redux';

import type {
	AuthActionsType,
} from '@base/store/Auth';
import type {
	InfosActionsType,
} from '@base/store/Infos';
import type {
	NotificationsActionsType,
} from '@base/store/Notifications';
import type {
	ModalActionsType,
} from '@base/store/Modal';
import type {
	UsersNotificationsActionsType,
} from '@base/store/UsersNotifications';
import type {
	AccountsActionsType,
} from '@base/store/Accounts';

export type BaseActions =
| AuthActionsType
| InfosActionsType
| NotificationsActionsType
| ModalActionsType
| UsersNotificationsActionsType
| AccountsActionsType;

export type BaseDispatch = Dispatch<BaseActions>;
