// @flow

import React from 'react';
import cx from 'classnames';

import {
	Text,
} from '@base/components';

import styles from './index.module.scss';

type ItemProps = {|
    searchType: string,
	value: string,
	focused: boolean,
	onMouseEnter: () => void,
	onClick: () => void,
|}

const Item = ({
	searchType,
	value,
	focused,
	onMouseEnter,
	onClick,
}: ItemProps) => (
	<li className={styles['item-wrapper']}>
		<button
			className={cx(
				styles.item,
				{
					[styles['item--focused']]: focused,
				},
			)}
			onMouseEnter={onMouseEnter}
			onClick={onClick}
			type="button"
		>
			<Text color="gray" className={styles['item__search-type']}>
				{searchType}
			</Text>
			<Text color="gray-dark" className={styles.item__value}>
				{value}
			</Text>
		</button>
	</li>
);

export default Item;
