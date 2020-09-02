// @flow

import React from 'react';
import {
	connect,
} from 'react-redux';

import {
	Button,
} from '@base/components';
import {
	authLogout,
} from '@base/store/Auth/actions';

import styles from './UserPanel.module.scss';

type HeaderOwnProps = {||};

type HeaderProps = {|
	...HeaderOwnProps,
	logoutHandler: () => void,
|};

export function UserPanel({
	logoutHandler,
}: HeaderProps) {
	return (
		<Button
			theme="primary"
			size="small"
			onClick={logoutHandler}
			className={styles['user-panel__sign-out-btn']}
		>
			Log Out
		</Button>
	);
}

const mapDispatchToProps = {
	logoutHandler: authLogout,
};

export default connect<_, HeaderOwnProps, _, _, _, _>(
	undefined,
	mapDispatchToProps,
)(UserPanel);
