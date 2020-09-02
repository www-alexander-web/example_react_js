// @flow

import React from 'react';
import cx from 'classnames';

import type {
	OrderType,
} from '@base/types';

import styles from './Table.module.scss';

type TableThProps = {
  className: string,
  id: string,
	isSort: boolean,
	isExternal?: boolean,
  valueSort: string,
  valueOrder: string,
  header: React$Node,
  onSetSort: (id: string, orderNew: OrderType) => void,
}

const TableTh = ({
	className,
	id,
	isSort,
	valueSort,
	valueOrder,
	isExternal,
	onSetSort,
	header,
}: TableThProps) => {
	const handelSetSort = () => {
		const sort = valueSort === id && valueOrder === 'desc' ? 'asc' : 'desc';
		onSetSort(id, sort);
	};

	if (isExternal === true) {
		return (
			<div
				role="rowheader"
				className={cx(styles['table__head-item'], className)}
			>
				{header}
			</div>
		);
	}

	return (
		<div
			role="rowheader"
			className={cx(styles['table__head-item'], className)}
		>
			{isSort ? (
				<button type="button" className={styles['table__button-box']} onClick={handelSetSort}>
					<span className={cx(
						styles['table__head-text'],
						{
							[styles['table__head-text--sort']]: isSort,
						},
						{
							[styles['table__head-text--active']]: valueSort === id,
						},
					)}
					>
						{header}
					</span>
					<div
						className={cx(
							styles.table__button,
							{
								[styles['table__button--active']]: valueSort === id && valueOrder === 'asc',
							},
						)}
					>
						<svg
							width={valueOrder === 'asc' && valueSort === id ? '1.3rem' : '0.8rem'}
							height={valueOrder === 'asc' && valueSort === id ? '1.3rem' : '0.8rem'}
							viewBox="0 0 8 5"
						>
							<path d="M4 0.333496L8 4.3335H0L4 0.333496Z" />
						</svg>
					</div>
					<div
						className={cx(
							styles.table__button,
							{
								[styles['table__button--active']]: valueSort === id && valueOrder === 'desc',
							},
						)}
					>
						<svg
							width={valueOrder === 'desc' && valueSort === id ? '1.3rem' : '0.8rem'}
							height={valueOrder === 'desc' && valueSort === id ? '1.3rem' : '0.8rem'}
							viewBox="0 0 8 5"
						>
							<path d="M4 4.6665L-3.49691e-07 0.666505L8 0.666504L4 4.6665Z" />
						</svg>
					</div>
				</button>
			) : (
				<span className={cx(
					styles['table__head-text'],
					{
						[styles['table__head-text--sort']]: isSort,
					},
					{
						[styles['table__head-text--active']]: valueSort === id,
					},
				)}
				>
					{header}
				</span>
			)}
		</div>
	);
};

TableTh.defaultProps = {
	className: '',
};
export default TableTh;
