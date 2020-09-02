// @flow

import React from 'react';

import {
	Text,
} from '@base/components';
import loginLogoSrc from '@base/assets/images/login-logo.png';

import {
	LoginForm,
} from '@auth/pages/Login/LoginForm';


import styles from './Login.module.scss';

export function Login() {
	return (
		<div className={styles.login}>
			<div className={styles.login__logo}>
				<img
					height={170}
					width={238}
					src={loginLogoSrc}
					alt="Login to AML"
				/>
			</div>
			<Text
				className={styles.login__header}
				type="h1"
				align="center"
			>
				Log In
			</Text>
			<LoginForm />
		</div>
	);
}

export default null;
