// @flow

import React, {
	useCallback,
	useEffect,
	useState,
} from 'react';
import cx from 'classnames';
import hash from 'object-hash';

import Text from '@base/components/Text';
import Pagination from '@base/components/Pagination';
import TableItem from '@base/components/Table/TableItem';
import TableTh from '@base/components/Table/TableTh';
import type {
	OrderType,
} from '@base/types';

import styles from './Table.module.scss';

// flowlint-next-line unclear-type: off
export type AnyObject = {|[key: string]: any|}
export type TableColumn<T> = {
	id: string,
	header: React$Node,
	customComponent?: (item: T, id: string) => React$Node,
	classNameRow?: string,
	isSort: boolean,
	isExternal?: boolean,
}

export type TableData<T> = Array<T>

type TableProps<T: AnyObject> = {|
	columns: Array<TableColumn<T>>,
	data: TableData<T>,
	children: React$Node,
	namePage: string,
	nameSort: string,
	nameOrder: string,
	valuePage: number,
	valueSort: string,
	valueOrder: OrderType,
	valueCount: number,
	valueSelect?: {
		name: string,
		value: string,
		id: string,
	},
	onChangePage: ({
		name: string,
		value: number,
	}) => void,
	onChangeSort: ({
		name: string,
		value: string,
	}) => void,
	onChangeOrder: ({
		name: string,
		value: OrderType,
	}) => void,
	onChangeSelect?: ({
		value: string,
		id: string,
		item?: T,
	}) => void,
	pageSize: number,
	isLoading: boolean,
	className: string,
	classNameTable: string,
	disable?: {
		id: string,
		value: Array<number>,
		field: string,
		valueField: Array<string>,
	},
	noDataMessage?: string,
|};

const Table = <T: AnyObject>({
	className,
	columns,
	data,
	children: TableRow,
	namePage,
	nameSort,
	nameOrder,
	valuePage,
	valueSort,
	valueOrder,
	valueCount,
	pageSize,
	isLoading,
	onChangePage,
	onChangeSort,
	onChangeOrder,
	valueSelect,
	onChangeSelect,
	classNameTable,
	disable,
	noDataMessage = 'no data found',
}: TableProps<T>) => {
	const [
		columnLength,
		setColumnLength,
	] = useState<number>(0);
	const [
		lastComponent,
		setLastComponent,
	] = useState<number>(0);

	const [
		dataWithHash,
		setDataWithHash,
	] = useState<TableData<{...T, hash: string}>>([]);

	useEffect(() => {
		if (data) {
			const dataNew = data.map((item) => ({
				...item,
				hash: hash(item),
			}));
			setDataWithHash(dataNew);
		}
	}, [
		data,
		setDataWithHash,
	]);

	const handleSetSort = useCallback((id: string, orderNew: 'asc' | 'desc') => {
		onChangeSort({
			name: nameSort || '',
			value: id,
		});
		onChangeOrder({
			name: nameOrder || '',
			value: orderNew,
		});
	}, [
		onChangeSort,
		onChangeOrder,
		nameSort,
		nameOrder,
	]);

	const handlePageChange = useCallback(({
		name, value,
	}) => {
		onChangePage({
			name,
			value,
		});
	}, [
		onChangePage,
	]);

	const handleSelectChange = useCallback((id: string, value: string, item: T) => {
		if (onChangeSelect) {
			onChangeSelect({
				id,
				value,
				item,
			});
		}
	}, [
		onChangeSelect,
	]);

	useEffect(() => {
		if (columns) {
			let length = 0;
			let last = -1;

			columns.forEach(({
				id,
				isExternal,
			}, index) => {
				const externalIsFirst = isExternal === true && index === 0;
				if (id !== '') {
					length += 1;
				}
				if (isExternal !== true || externalIsFirst) {
					last += 1;
				}
			});

			setLastComponent(last);
			setColumnLength(length);
		}
	}, [
		columns,
	]);

	useEffect(() => {
		if (((valueSelect && !valueSelect.id) || !valueSelect) && onChangeSelect && dataWithHash.length > 0) {
			handleSelectChange(dataWithHash[0].hash, valueSelect ? dataWithHash[0][valueSelect.name] : '', dataWithHash[0]);
		}
	}, [
		onChangeSelect,
		dataWithHash,
		columns,
		handleSelectChange,
		valueSelect,
	]);

	let nowIndex = 0;

	return (
		<div className={cx(
			styles.table,
			className,
		)}
		>
			<div className={styles.table__box}>
				<div
					className={cx(
						styles.table__content,
						classNameTable,
						{
							[styles['table__content--default']]: data.length === 0,
						},
					)}
					role="table"
					style={{
						gridTemplateColumns: `repeat(${columnLength}, auto)`,
					}}
				>
					{columns.map(({
						header,
						id,
						isSort,
						classNameRow,
						isExternal,
					}) => {
						nowIndex += 1;
						return (
							<TableTh
								key={nowIndex}
								id={id}
								header={header}
								isSort={isSort}
								className={classNameRow}
								onSetSort={handleSetSort}
								isExternal={isExternal}
								valueOrder={valueOrder}
								valueSort={valueSort}
							/>
						);
					})}
					{data.length === 0 && (
						<div
							className={styles.table__default}
							style={{
								gridColumn: `span ${lastComponent + 1}`,
							}}
						>
							<Text type="h3" color="gray">{noDataMessage}</Text>
						</div>

					)}
					{
						dataWithHash.map((item) => (columns.map(({
							id,
							customComponent,
							isExternal,
						}, index, array) => {
							nowIndex += 1;
							if (id === '') {
								return null;
							}
							return (
								<div
									role="tablist"
									tabIndex="-1"
									key={nowIndex}
									onClick={() => handleSelectChange(item.hash, valueSelect ? item[valueSelect.name] : '', item)}
									onKeyPress={() => {}}
									className={cx(styles.table__item,
										{
											[styles['table__item--click']]: onChangeSelect,
											[styles['table__item--first']]: array[0].isExternal === true ? index === 1 : index === 0,
											[styles['table__item--last']]: index === lastComponent,
											[styles['table__item--external']]: isExternal,
											[styles['table__item--second']]: item.rowType === 'second',
											[styles['table__item--active']]: valueSelect && valueSelect.id === item.hash,
											[styles['table__item--disable']]: disable
												&& Object.keys(item).includes(disable.id)
												&& Object.keys(item).includes(disable.field)
												&& !disable.value.includes(item[disable.id])
												&& disable.valueField.includes(item[disable.field]),
										})}
								>
									<TableItem
										id={id}
										item={item}
										TableRow={TableRow}
										isExternal={isExternal}
										customComponent={customComponent}
									/>
								</div>
							);
						})
						))
					}
				</div>
			</div>
			<div className={styles.table__pagination}>
				<Pagination
					count={valueCount}
					name={namePage}
					page={valuePage}
					pageSize={pageSize}
					onChange={handlePageChange}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
};

Table.defaultProps = {
	pageSize: 5,
	isLoading: false,
	className: '',
	children: null,
	classNameTable: '',
};

export default Table;
