// @flow

import React from 'react';
import cx from 'classnames';

import BreadCrumbs from '../BreadCrumbs';

import styles from './Navigation.module.scss';

type NavigationProps = {
	onUseNavigation: () => [Array<{path: string, label: string}>, string];
	className?: string,
};

const Navigation = ({
	className,
	onUseNavigation,
}: NavigationProps) => {
	const [
		paths,
	] = onUseNavigation();
	return (
		<div className={cx(styles.navigation, className)}>
			<BreadCrumbs className={styles.navigation__links} paths={paths} />
		</div>
	);
};

Navigation.defaultProps = {
	className: '',
};

export default Navigation;
