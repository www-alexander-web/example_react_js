// @flow

import React, {
	useState,
	useEffect,
} from 'react';

import Table, {
	type TableColumn,
	type TableData,
	type AnyObject,
} from '@base/components/Table';

type TableSortedProps<T> = {|
	children: React$Node,
	className: string,
	classNameTable: string,
	data: TableData<T>,
	isLoading: boolean,
	columns: Array<TableColumn<T>>,
	pageSize: number,
	valueSelect?: {
		name: string,
		value: string,
		id: string,
	},
	onChangeSelect?: ({
		value: string,
		id: string,
		item?: T,
	}) => void,
		disable?: {
				id: string,
				value: Array<number>,
				field: string,
				valueField: Array<string>
		},
	noDataMessage?: string,
|};

const PAGE_SIZE = 20;

const TableSorted = <T: AnyObject>({
	className,
	classNameTable,
	data,
	isLoading,
	columns,
	pageSize,
	valueSelect,
	onChangeSelect,
	children,
	disable,
	noDataMessage,
}: TableSortedProps<T>) => {
	const [
		filteredData,
		setFilteredData,
	] = useState<TableData<T>>([]);
	const [
		sort,
		setSort,
	] = useState<string>('');
	const [
		order,
		setOrder,
	] = useState<'asc' | 'desc'>('asc');
	const [
		page,
		setPage,
	] = useState<number>(0);

	useEffect(() => {
		const filteredDataNew = data.slice(0, data.length).sort(({
			[sort]: a,
		}, {
			[sort]: b,
		}) => {
			if (a > b) {
				return order === 'asc' ? 1 : -1;
			}
			if (a < b) {
				return order === 'asc' ? -1 : 1;
			}
			return 0;
		});
		const pageData = filteredDataNew.slice(page * pageSize, (page + 1) * pageSize);
		setFilteredData(pageData);
	}, [
		data,
		sort,
		order,
		page,
		pageSize,
	]);

	return (
		<Table
			className={className}
			classNameTable={classNameTable}
			nameSort="sort"
			valueSort={sort}
			onChangeSort={({
				value,
			}) => (setSort(value))}
			nameOrder="order"
			valueOrder={order}
			onChangeOrder={({
				value,
			}) => (setOrder(value))}
			namePage="page"
			valuePage={page}
			onChangePage={({
				value,
			}) => (setPage(value))}
			columns={columns}
			data={filteredData}
			isLoading={isLoading}
			pageSize={pageSize}
			valueCount={data.length}
			valueSelect={valueSelect}
			onChangeSelect={onChangeSelect}
			disable={disable}
			noDataMessage={noDataMessage}
		>
			{children}
		</Table>
	);
};

TableSorted.defaultProps = {
	className: '',
	classNameTable: '',
	isLoading: false,
	pageSize: PAGE_SIZE,
	children: null,
};

export default TableSorted;
