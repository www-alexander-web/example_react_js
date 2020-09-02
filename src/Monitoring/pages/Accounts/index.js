// @flow

import React from 'react';

import {
	Text,
	Navigation,
} from '@base/components';

import AccountProfilesTableWrapper
	from '@mg/containers/Accounts/AccountProfilesTableWrapper/AccountProfilesTableWrapper';
import AccountsTable from '@mg/containers/Accounts/AccountsTableWrapper/AccountsTableWrapper';
import AccountCurrenciesTableWrapper
	from '@mg/containers/Accounts/AccountBalancesTableWrapper/AccountBalancesTableWrapper';
import useNavigationLP from '@mg/hooks/useNavigation';

import styles from './Accounts.module.scss';

export function Accounts() {
	return (
		<div className={styles.accounts}>
			<Text type="h1" align="center" className={styles.accounts__title}>Accounts</Text>
			<Navigation onUseNavigation={useNavigationLP} className={styles.accounts__navigation} />
			<AccountsTable />
			<div className={styles.account}>
				<AccountProfilesTableWrapper />
				<AccountCurrenciesTableWrapper />
			</div>
		</div>
	);
}

export default null;
