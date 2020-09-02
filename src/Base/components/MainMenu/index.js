// @flow

import React from 'react';
import cx from 'classnames';
import {
	NavLink,
} from 'react-router-dom';
import {
	connect,
} from 'react-redux';

import type {
	MenuLink,
	ModuleLink,
} from '@base/types';
import Text from '@base/components/Text';
import {
	getMenuPaths,
} from '@base/utils/getTabPaths';
import modulesRoutes from '@base/constants/routesModules';

import styles from './MainMenu.module.scss';

const menuLinksModules = getMenuPaths(modulesRoutes);

type OwnProps = {|
	menuLinks: Array<MenuLink>,
	modulesLinks?: Array<ModuleLink>,
	className?: string,
|};

type MainMenuProps = {|
	...OwnProps,
|};

export const MainMenu = ({
	className,
	menuLinks,
	modulesLinks,
}: MainMenuProps) => {
	let nowIndex = 0;
	return (
		<div className={cx(styles['main-menu'], className)}>
			<div className={styles['main-menu__title']}>
				<Text type="h6">Menu</Text>
			</div>
			<ul className={styles['main-menu__list']}>
				{menuLinks.map(({
					path, label, icon,
				}) => {
					nowIndex += 1;
					return (
						<li key={nowIndex}>
							<NavLink
								activeClassName={styles['main-menu__link--active']}
								className={styles['main-menu__link']}
								to={path}
							>
								<span className={styles['main-menu__icon']}>
									<i className={icon} />
								</span>
								<Text type="h4">{label}</Text>
							</NavLink>
						</li>
					);
				})}
			</ul>

			<div className={styles['main-menu__title']}>
				<Text type="h6">Modules</Text>
			</div>
			<ul className={styles['main-menu__list']}>
				{Array.isArray(modulesLinks) && modulesLinks.map(({
					path, label, icon,
				}) => {
					nowIndex += 1;
					return (
						<li key={nowIndex}>
							<NavLink
								activeClassName={styles['main-menu__link--active']}
								className={styles['main-menu__link']}
								to={path}
							>
								<span className={styles['main-menu__icon']}>
									<i className={icon} />
								</span>
								<Text type="h4">{label}</Text>
							</NavLink>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

MainMenu.defaultProps = {
	modulesLinks: menuLinksModules,
};


const mapStateToProps = (() => ({}));

const mapDispatchToProps = () => ({});

export default connect<_, OwnProps, _, _, _, _>(
	mapStateToProps,
	mapDispatchToProps,
)(MainMenu);
