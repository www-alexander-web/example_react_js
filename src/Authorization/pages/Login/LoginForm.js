// @flow

import React from 'react';
import {
	useFormik,
} from 'formik';
import {
	useSelector,
	useDispatch,
} from 'react-redux';
import {
	string,
	object,
} from 'yup';

import errorMessages from '@base/constants/errorMessages';
import {
	Input,
	Button,
} from '@base/components';
import {
	authReqLogin,
} from '@base/store/Auth/actions';
import {
	stub,
} from '@base/utils/functions';
import type {
	BaseState,
} from '@base/types';

import styles from '@auth/pages/Login/Login.module.scss';

type LoginFormFieldsType = {|
	email: string,
	password: string,
|};

export const initialValues = {
	email: '',
	password: '',
};

const validationSchema = object().shape({
	email: string()
		.email(errorMessages.INVALID_EMAIL)
		.required(errorMessages.FIELD_IS_REQUIRED),
	password: string()
		.required(errorMessages.FIELD_IS_REQUIRED),
});

export function LoginForm() {
	const isLoading = useSelector(({
		base,
	}: BaseState) => base.auth.isLoading);
	const dispatch = useDispatch();

	const {
		handleChange,
		handleBlur,
		handleSubmit,
		values,
		errors,
		touched,
		isValid,
	} = useFormik<LoginFormFieldsType>({
		initialValues,
		onSubmit: (formData) => dispatch(authReqLogin(formData)),
		validationSchema,
		validateOnMount: true,
	});

	const onChangeHandler = React.useCallback(
		({ name, value }) => {
			const event = {
				target: {	name,	value	},
			};
			handleChange(event);
		},
		[
			handleChange,
		],
	);

	return (
		<form
			onSubmit={handleSubmit}
			className={styles.login__form}
		>
			<div className={styles['login__form-input']}>
				<Input
					label="Login"
					name="email"
					required
					value={values.email}
					onChange={onChangeHandler}
					onBlur={handleBlur}
					error={
						(touched.email !== undefined && errors.email !== undefined)
							? errors.email || ''
							: undefined
					}
				/>
			</div>
			<div className={styles['login__form-input']}>
				<Input
					label="Password"
					name="password"
					required
					type="password"
					value={values.password}
					onChange={onChangeHandler}
					onBlur={handleBlur}
					error={
						(touched.password !== undefined && errors.password !== undefined)
							? errors.password || ''
							: undefined
					}
				/>
			</div>
			<Button
				size="large"
				type="submit"
				theme="secondary"
				fluid
				onClick={stub}
				disabled={isLoading || !isValid}
				className={styles['login__form-button']}
			>
				{ isLoading ? 'Loading...' : 'Log In' }
			</Button>
		</form>
	);
}

export default null;
