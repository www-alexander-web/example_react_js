// @flow

import type { RouterState } from 'connected-react-router';

import type { AuthState } from '@base/store/Auth';
import type { InfosState } from '@base/store/Infos';
import type { NotificationsState } from '@base/store/Notifications';
import type { ModalState } from '@base/store/Modal';
import type { UsersNotificationsState } from '@base/store/UsersNotifications';
import type { AccountsState } from '@base/store/Accounts';
import type { UIState } from '@base/types/store/ui';
import type { ProfitsState } from '@base/store/ProfitHistory';

export type BaseState = {|
	router: RouterState,
	base: {|
		auth: AuthState,
		infos: InfosState,
		notifications: NotificationsState,
		modal: ModalState,
		users: UsersNotificationsState,
		ui: UIState,
		components: {
			accounts: AccountsState,
			profits: ProfitsState,
		}
	|},
|};
