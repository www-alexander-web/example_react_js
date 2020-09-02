/* eslint-disable react/no-unused-prop-types */
// @flow

import React, {
	useCallback,
	useEffect,
	useState,
} from 'react';
import {
	useFormik,
} from 'formik';
import {
	connect,
} from 'react-redux';

import {
	InputSearch,
	Select,
	TableSorted,
	Text,
} from '@base/components';
import RestProfileId from '@base/components/RestProfileId';

import {
	accountsReqAction,
	accountBalancesReqAction,
	accountProfilesReqAction,
} from '@mg/store/Accounts/actions';
import type {
	MonitoringState,
} from '@mg/types';
import type {
	AccountsAccount,
	typeGetBalancesReqAction,
	typeGetProfilesReqAction,
} from '@mg/store/Accounts/types';
import styles
	from '@mg/containers/Accounts/AccountsTableWrapper/AccountsTableWrapper.module.scss';

type OwnProps = {|
	className?: string,
|};

type AccountsTableWrapperProps = {|
	...OwnProps,
	data: Array<AccountsAccount>,
	isLoading: boolean,
	onAccountsGet: () => void,
	onAccountProfilesGet: (obj: typeGetProfilesReqAction) => void,
	onAccountBalancesGet: (obj: typeGetBalancesReqAction) => void,
|};

export type AccountsTableWrapperFields = {
	inputSearch: string,
	exchange: string,
	currency: string,
};

const fields: AccountsTableWrapperFields = {
	inputSearch: '',
	exchange: '',
	currency: '',
};

const columns = [
	{
		id: 'id',
		header: 'id',
		isSort: false,
	},
	{
		id: 'profiles',
		header: 'Profile ID',
		isSort: false,
		customComponent: (item) => (
			<RestProfileId
				name={`${item.name}-${item.id}`}
				profiles={item.profiles}
			/>
		),
	},
	{
		id: 'name',
		header: 'name',
		isSort: true,
	},
	{
		id: 'consumerID',
		header: 'Consumer Id',
		isSort: false,
		customComponent: (item) => (item.consumerID ? item.consumerID : '-'),
	},
	{
		id: 'creatorID',
		header: 'Creator Id',
		isSort: false,
	},
	{
		id: 'exchange',
		header: 'exchange',
		isSort: true,
	},
	{
		id: 'createdAt',
		header: 'date',
		isSort: true,
	},
];

const options = [
	{
		value: 'test1',
		label: 'Test',
	},
	{
		value: 'test2',
		label: 'Info',
	},
	{
		value: 'test3',
		label: 'Address',
	},
];

const PAGE_SIZE = 5;

export const AccountsTableWrapper = ({
	data,
	isLoading,
	onAccountsGet,
	onAccountProfilesGet,
	onAccountBalancesGet,
	className,
}: AccountsTableWrapperProps) => {
	const [
		dataAccounts,
		setDataAccounts,
	] = useState<Array<AccountsAccount>>([]);
	const [
		walletSelect,
		setWalletSelect,
	] = useState({
		id: '',
		value: '',
		name: 'userId',
	});

	const handleOnSubmit = useCallback(({
		inputSearch,
		exchange,
		currency,
	}) => {
		const dataNew = data.filter(({
			userEmail,
			userID,
			exchangeRaw,
			balances,
			name,
		}) => {
			let isAdd = true;
			if (inputSearch !== '' && !String(userEmail).includes(inputSearch) && !String(userID).includes(inputSearch) && !String(name).includes(inputSearch)) {
				isAdd = false;
			}

			if (exchange !== '' && exchangeRaw !== exchange) {
				isAdd = false;
			}

			if (currency !== '' && !Object.keys(balances || {}).some((key) => key === currency)) {
				isAdd = false;
			}

			return isAdd;
		});
		setDataAccounts(dataNew);
	}, [
		data,
	]);

	const handleChangeSelect = useCallback(({
		id, value, item,
	}) => {
		setWalletSelect({
			...walletSelect,
			id,
			value,
		});
		onAccountProfilesGet({
			userId: (item && item.id) || 0,
		});
		onAccountBalancesGet({
			balances: item && item.balances,
		});
	}, [
		onAccountBalancesGet,
		onAccountProfilesGet,
		walletSelect,
	]);


	const {
		values,
		handleChange,
		handleSubmit,
	} = useFormik<AccountsTableWrapperFields>({
		enableReinitialize: true,
		initialValues: fields,
		onSubmit: (obj) => handleOnSubmit(obj),
	});

	const handleValueChange = useCallback(({
		value,
		name,
	}) => {
		const event = {
			target: {
				value,
				name,
			},
		};
		handleChange(event);
		if (name !== 'inputSearch') {
			handleSubmit();
		}
	}, [
		handleChange,
		handleSubmit,
	]);

	useEffect(() => {
		if (onAccountsGet) {
			onAccountsGet();
		}
	}, [
		onAccountsGet,
	]);

	useEffect(() => {
		if (Array.isArray(data)) {
			handleSubmit();
		}
	}, [
		data,
		handleSubmit,
	]);

	return (
		<div className={className}>
			<div className={styles['segmented-control']}>
				<div className={styles['segmented-control__section']}>
					<div className={styles['segmented-control__search']}>
						<InputSearch
							name="inputSearch"
							value={values.inputSearch}
							placeholder="Account ID or Account name or User ID or User email.."
							onChange={handleValueChange}
							onClick={handleSubmit}
						/>
					</div>
					<div className={styles['segmented-control__select']}>
						<Text type="h5" color="gray">Filter 1</Text>
						<Select options={options} value="" name="filter1" onChange={() => {}} />
					</div>
					<div className={styles['segmented-control__select']}>
						<Text type="h5" color="gray">Filter 2</Text>
						<Select options={options} value="" name="filter2" onChange={() => {}} />
					</div>
				</div>
			</div>
			<div>
				<TableSorted
					columns={columns}
					data={dataAccounts}
					isLoading={isLoading}
					valueSelect={walletSelect}
					onChangeSelect={handleChangeSelect}
					pageSize={PAGE_SIZE}
				/>
			</div>
		</div>
	);
};

AccountsTableWrapper.defaultProps = {
	data: [],
};

const mapStateToProps = ({
	mg,
}: MonitoringState) => ({
	data: mg.accounts.accounts.data,
	isLoading: mg.accounts.accounts.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
	onAccountsGet: () => dispatch(accountsReqAction()),
	onAccountProfilesGet: (obj: typeGetProfilesReqAction) => dispatch(accountProfilesReqAction(obj)),
	onAccountBalancesGet: (obj: typeGetBalancesReqAction) => dispatch(accountBalancesReqAction(obj)),
});

export default connect<_, OwnProps, _, _, _, _>(
	mapStateToProps,
	mapDispatchToProps,
)(AccountsTableWrapper);
