// @flow

import React from 'react';
import {
	Redirect,
} from 'react-router-dom';
import {
	useSelector,
} from 'react-redux';

import {
	Text,
	Link,
} from '@base/components';
import type {
	BaseState,
} from '@base/types';

import {
	TwoStepAuthForm,
} from '@auth/pages/TwoStepAuth/TwoStepAuthForm';


import styles from './TwoStepAuth.module.scss';

export function TwoStepAuth() {
	const password = useSelector<BaseState, _>(({
		base,
	}) => base.auth.password);

	if (!password) {
		return <Redirect to="/" />;
	}

	return (
		<div className={styles['two-step-auth']}>
			<Text
				type="h1"
				align="center"
			>
				Enter Conformation Code
			</Text>
			<Text align="center" className={styles['two-step-auth__description']}>
				One morning, when Gregor Samsa woke from troubled dreams, he
				found himself transformed in
				<Text> johndoe@mail.com</Text>
			</Text>
			<TwoStepAuthForm />
			<Text align="center" color="gray" className={styles['two-step-auth__back-link']}>
				Back to
				<Link to="/" className={styles['two-step-auth__back-link']}> .......com</Link>
			</Text>
		</div>
	);
}

export default null;
