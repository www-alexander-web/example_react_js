// @flow

import React, {
	useState,
	useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';

import { checkToken as checkTokenAction } from '@base/store/Auth/actions';
import useScrollData from '@base/hooks/useScrollData';
import { gettingNotification } from '@base/store/Notifications/actions';
import type {
	BaseState,
	TypeNotification,
	MenuLink,
	ModuleLink,
} from '@base/types';
import {
	MainMenu as MainMenuContainer,
	Button,
	Logo,
	Navigation,
	Notification,
} from '@base/components';
import ConnectedUserPanel from '@base/containers/UserPanel';
import Footer from '@base/containers/Footer';
import ModalWindowBox from '@base/containers/ModalWindow';

import styles from './MainLayout.module.scss';

type OwnProps = {|
	children: React$Node,
	menuLinks: Array<MenuLink>,
	modulesLinks?: Array<ModuleLink>,
	onUseNavigation: () => [Array<{path: string, label: string}>, string];
|};

type MainLayoutProps = {|
	...OwnProps,
	message: string,
	type: TypeNotification,
	location: string,
	isUpdate: boolean,
	onGettingNotification: () => void,
	checkToken: () => void,
|};

export function MainLayout({
	children,
	location,
	message,
	type,
	menuLinks,
	modulesLinks,
	isUpdate,
	onUseNavigation,
	onGettingNotification,
	checkToken,
}: MainLayoutProps) {
	const [
		isOpen,
		setIsOpen,
	] = useState<boolean>(false);
	const {
		direction, y,
	} = useScrollData();

	useEffect(() => {
		setIsOpen(false);
		checkToken();
	}, [ location, checkToken ]);

	useEffect(() => {
		if (isOpen) {
			if (document.body) {
				document.body.style.overflow = 'hidden';
			}
		} else if (document.body) {
			document.body.style.overflow = 'auto';
		}
	}, [
		isOpen,
	]);

	return (
		<div className={styles['main-layout']}>
			<header
				className={cx(
					styles['main-layout__header-logo'],
					{
						[styles['main-layout__header-logo--down']]: direction === 'down' && y > 30,
					},
				)}
			>
				<Button
					className={styles['main-layout__logo-button']}
					theme="icon"
					onClick={() => setIsOpen(!isOpen)}
				>
					<i className="icon-menu" />
				</Button>
				<Link className={styles['main-layout__logo-link']} to="/auth/project-select">
					<Logo />
				</Link>
				<Button
					className={styles['main-layout__logo-button']}
					theme="icon"
					onClick={() => {}}
				>
					<i className="icon-bell-alt" />
				</Button>
			</header>
			<div
				className={cx(
					styles['main-layout__menu'],
					{
						[styles['main-layout__menu--open']]: isOpen,
					},
				)}
				role="menu"
			>
				<MainMenuContainer
					menuLinks={menuLinks}
					modulesLinks={modulesLinks}
				/>
				<div className={styles['main-layout__menu-user']}>
					<ConnectedUserPanel />
				</div>
			</div>
			{/* eslint-disable-next-line max-len */}
			{/* eslint-disable-next-line jsx-a11y/control-has-associated-label */ /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
			<div
				role="button"
				className={cx(
					styles['main-layout__block'],
					{
						[styles['main-layout__block--open']]: isOpen,
					},
				)}
				onClick={() => setIsOpen(false)}
				tabIndex="0"
			/>
			<aside
				className={cx(
					styles['main-layout__aside'],
					{
						[styles['main-layout__aside--open']]: isOpen,
					},
				)}
			>
				<header className={styles['main-layout__aside-header']}>
					<Link to="/">
						<Logo />
					</Link>
				</header>
				<MainMenuContainer
					menuLinks={menuLinks}
					modulesLinks={modulesLinks}
				/>
				<footer className={styles['main-layout__footer']}>
					<Footer />
				</footer>
			</aside>
			<main className={styles['main-layout__main']}>
				<header className={styles['main-layout__main-header']}>
					<Button
						className={styles['main-layout__main-button']}
						theme="icon"
						onClick={() => setIsOpen(!isOpen)}
					>
						<i className="icon-menu" />
					</Button>
					<Navigation onUseNavigation={onUseNavigation} />
					<ConnectedUserPanel />
				</header>
				<div className={styles['main-layout__page-wrapper']}>
					{ children }
				</div>
				<div className={styles['main-layout__notification']}>
					<Notification
						type={type}
						message={message}
						isUpdate={isUpdate}
						onGettingNotification={onGettingNotification}
					/>
				</div>
				<footer className={styles['main-layout__footer-mobile']}>
					<Footer />
				</footer>
				<ModalWindowBox />
			</main>
		</div>
	);
}

const mapStateToProps = ({
	base,
	router,
}: BaseState) => ({
	location: router.location.pathname,
	message: base.notifications.message,
	type: base.notifications.type,
	isUpdate: base.notifications.isUpdate,
});

const mapDispatchToProps = (dispatch) => ({
	onGettingNotification: () => dispatch(gettingNotification()),
	checkToken: () => dispatch(checkTokenAction()),
});

export default connect<_, OwnProps, _, _, _, _>(
	mapStateToProps,
	mapDispatchToProps,
)(MainLayout);
