// @flow

import React from 'react';
import cx from 'classnames';
import {
	NavLink,
} from 'react-router-dom';

import style from './BreadCrumbs.module.scss';

export type BreadCrumbsPaths = {
	path: string,
	label: string,
};
type BreadCrumbsProps = {
	paths: Array<BreadCrumbsPaths>,
	className?: string,
};

const BreadCrumbs = ({
	className,
	paths,
}: BreadCrumbsProps) => (
	<nav
		className={cx(
			style['bread-crumbs'],
			className,
		)}
	>
		<ul className={style['bread-crumbs__box']}>
			{paths.length > 1 && paths.map(({
				label, path,
			}, key) => (
				<li
					key={path}
					className={style['bread-crumbs__item']}
				>
					<NavLink className={key === 0 ? style['bread-crumbs__link_first'] : style['bread-crumbs__link']} to={path}>
						{label}
					</NavLink>
				</li>
			))}
		</ul>
	</nav>
);

export default BreadCrumbs;
