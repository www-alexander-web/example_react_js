// @flow

import React from 'react';

import styles from './Table.module.scss';

// flowlint-next-line unclear-type: off
export type AnyObject = {[key: string]: any}

type TableItemProps<T> = {|
	id: string,
	TableRow?: React$Node,
	isExternal?: boolean,
	item: T,
	customComponent?: (item: T, id: string) => React$Node,
|};

const TableItem = <T: AnyObject>({
	TableRow,
	item,
	isExternal,
	id,
	customComponent,
}: TableItemProps<T>) => {
	if (TableRow !== null) {
		// $FlowFixMe
		return <TableRow id={id} item={item} />;
	}

	if (customComponent) {
		return (
			<div className={styles['table__item-content']}>
				{isExternal === true
					|| (item[id] !== ''
					&& item[id] !== null
					&& item[id] !== undefined)
					? customComponent(item, id) : null}
			</div>
		);
	}

	if (item.rowType === 'second') {
		return (
			<div className={styles['table__item-content']}>
				{
					item[id] !== ''
					&& item[id] !== null
					&& item[id] !== undefined
						? item[id] : ''
				}
			</div>
		);
	}

	return (
		<div className={styles['table__item-content']}>
			{
				item[id] !== ''
				&& item[id] !== null
				&& item[id] !== undefined
					? item[id] : '__'
			}
		</div>
	);
};

export default TableItem;
