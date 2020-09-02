// @flow

import React from 'react';

import {
	Logo,
} from '@base/components';

import styles from './AuthLayout.module.scss';

type AuthLayoutProps = {
	children: React$Node,
}

export function AuthLayout({
	children,
}: AuthLayoutProps) {
	return (
		<div className={styles['auth-layout']}>
			<header className={styles['auth-layout__header']}>
				<Logo />
			</header>
			<main className={styles['auth-layout__main']}>
				{ children }
			</main>
		</div>
	);
}

export default null;
