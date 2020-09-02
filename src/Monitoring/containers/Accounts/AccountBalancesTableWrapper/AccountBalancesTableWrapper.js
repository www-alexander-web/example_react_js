// @flow

import React from 'react';
import {
	connect,
} from 'react-redux';

import {
	TableSorted,
	Text,
} from '@base/components';

import type {
	MonitoringState,
} from '@mg/types';
import type {
	AccountBalance,
} from '@mg/store/Accounts/types';
import styles
	from '@mg/containers/Accounts/AccountProfilesTableWrapper/AccountProfilesTableWrapper.module.scss';


type OwnProps = {|
|};

type AccountsBalancesTableWrapperProps = {|
	...OwnProps,
	data: Array<AccountBalance>,
	isLoading: boolean,
|};

const columns = [
	{
		id: 'label',
		header: 'currency',
		isSort: true,
	},
	{
		id: 'value',
		header: 'available balance',
		isSort: true,
	},
];

const PAGE_SIZE = 5;

const AccountBalancesTableWrapper = ({
	data,
	isLoading,
}: AccountsBalancesTableWrapperProps) => (
	<div>
		<div className={styles['segmented-control']}>
			<div className={styles['segmented-control__text']}>
				<Text type="h2">
					Balances
				</Text>
			</div>
		</div>
		<TableSorted
			columns={columns}
			data={data}
			isLoading={isLoading}
			pageSize={PAGE_SIZE}
		/>
	</div>
);


AccountBalancesTableWrapper.defaultProps = {
	data: [],
};

const mapStateToProps = ({
	mg,
}: MonitoringState) => ({
	data: mg.accounts.accountBalances.data,
	isLoading: mg.accounts.accountBalances.isLoading,
});

const mapDispatchToProps = () => ({});

export default connect<_, OwnProps, _, _, _, _>(
	mapStateToProps,
	mapDispatchToProps,
)(AccountBalancesTableWrapper);
