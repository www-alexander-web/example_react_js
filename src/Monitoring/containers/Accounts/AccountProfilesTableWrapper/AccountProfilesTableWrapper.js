/* eslint-disable react/no-unused-prop-types */
// @flow

import React, {
	useEffect,
	useState,
	useCallback,
} from 'react';
import {
	connect,
} from 'react-redux';
import {
	useFormik,
} from 'formik';

import type {
	SelectOptions,
} from '@base/types';
import {
	TableSorted,
	RadioButton,
	Text,
} from '@base/components';

import type {
	AccountProfile,
} from '@mg/store/Accounts/types';
import type {
	MonitoringState,
} from '@mg/types';
import styles
	from '@mg/containers/Accounts/AccountProfilesTableWrapper/AccountProfilesTableWrapper.module.scss';


export type AccountProfilesTableFields = {
		testType: string,
	};

const fields: AccountProfilesTableFields = {
	testType: '',
};

type OwnProps = {|
	className?: string,
|};

type AccountsProfilesTableWrapperProps = {|
	...OwnProps,
	data: Array<AccountProfile>,
	optionsTestTypes: Array<SelectOptions<string>>,
|};


const columns = [
	{
		id: 'id',
		header: 'id',
		isSort: false,
	},
	{
		id: 'name',
		header: 'name',
		isSort: true,
	},
	{
		id: 'testType',
		header: 'Test Type',
		isSort: true,
	},
	{
		id: 'sessionID',
		header: 'session id',
		isSort: true,
	},
	{
		id: 'createdAt',
		header: 'created at',
		isSort: true,
	},
	{
		id: 'lastStartTime',
		header: 'last launched at',
		isSort: true,
	},
];

const PAGE_SIZE = 5;

const AccountProfilesTableWrapper = ({
	data,
	optionsTestTypes,
	className,
}: AccountsProfilesTableWrapperProps) => {
	const [
		dataProfiles,
		setDataProfiles,
	] = useState<Array<AccountProfile>>([]);

	const handleOnSubmit = useCallback(({
		testType,
	}) => {
		const dataNew = data.filter((item) => {
			let isAdd = true;

			if (testType !== '' && item.bot !== testType) {
				isAdd = false;
			}
			return isAdd;
		});
		setDataProfiles(dataNew);
	}, [
		data,
	]);

	const {
		values,
		handleChange,
		handleSubmit,
	} = useFormik<AccountProfilesTableFields>({
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
		if (data) {
			handleSubmit();
		}
	}, [
		data,
		handleSubmit,
	]);

	return (
		<div className={className}>
			<form className={styles['segmented-control']}>
				<div className={styles['segmented-control__text']}>
					<Text type="h2">
						Profiles
					</Text>
				</div>
				<div className={styles['segmented-control__radio']}>
					<RadioButton
						name="testType"
						value={values.testType}
						options={optionsTestTypes}
						onChange={handleValueChange}
						classNameInputWrap={styles.radioButton}
					/>
				</div>
			</form>
			<TableSorted
				columns={columns}
				data={dataProfiles}
				pageSize={PAGE_SIZE}
			/>
		</div>
	);
};


AccountProfilesTableWrapper.defaultProps = {
	data: [],
};

const mapStateToProps = ({
	mg,
	base,
}: MonitoringState) => ({
	data: mg.accounts.accountProfiles.data,
	optionsTestTypes: base.infos.optionsTestTypes,
});

const mapDispatchToProps = () => ({});

export default connect<_, OwnProps, _, _, _, _>(
	mapStateToProps,
	mapDispatchToProps,
)(AccountProfilesTableWrapper);
