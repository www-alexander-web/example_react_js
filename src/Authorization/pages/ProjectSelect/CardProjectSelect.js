// @flow
import React from 'react';

import type {
	ProjectSelectLink,
} from '@base/types';
import {
	Text,
	Link,
} from '@base/components';
import {
	getMenuPaths,
} from '@base/utils/getTabPaths';

import authRoutes from '@auth/constants/routes';

import styles from './ProjectSelect.module.scss';

const cardLinks = getMenuPaths(authRoutes.auth['project-select']);

type CardProjectSelectProps = {
	projectSelectLink: Array<ProjectSelectLink>,
}

const CardProjectSelect = ({
	projectSelectLink,
}: CardProjectSelectProps) => (
	<div className={styles['project-select__cards']}>
		{projectSelectLink.map(({
			path,
			label,
			icon,
		}) => (
			<div
				className={styles['project-select__card']}
				key={path}
			>
				<Link
					to={path}
				>
					<img
						className={styles['project-select__card-img']}
						src={icon}
						alt=""
					/>
				</Link>
				<Link
					to={path}
					className={styles['project-select__card-title']}
				>
					<Text type="h2" color="gray-dark">
						{label}
					</Text>
				</Link>
			</div>
		))}
	</div>

);

CardProjectSelect.defaultProps = {
	projectSelectLink: cardLinks,
};

export default CardProjectSelect;
