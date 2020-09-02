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
	number,
	object,
} from 'yup';

import errorMessages from '@base/constants/errorMessages';
import {
	authReqAuth,
} from '@base/store/Auth/actions';
import {
	Input,
	Text,
	Button,
} from '@base/components';
import {
	stub,
} from '@base/utils/functions';
import type {
	BaseState,
} from '@base/types';

import styles from '@auth/pages/TwoStepAuth/TwoStepAuth.module.scss';

type InitialValuesType = {|
	authCode: string,
|};

const initialValues = {
	authCode: '',
};

const validationSchema = object().shape({
	authCode: number()
		.label('2FA Code')
		.typeError(errorMessages.MUST_BE_A_NUMBER)
		.integer()
		.positive()
		.required(),
});

export function TwoStepAuthForm() {
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
	} = useFormik<InitialValuesType>({
		initialValues,
		onSubmit: ({
			authCode,
		}) => dispatch(authReqAuth({
			authCode: parseInt(authCode, 10),
			path: '/auth/project-select',
		})),
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
			className={styles['two-step-auth__form']}
		>
			<Input
				name="authCode"
				label="2FA Code"
				required
				value={values.authCode}
				onChange={onChangeHandler}
				className={styles['two-step-auth__form-input']}
				onBlur={handleBlur}
				error={
					(touched.authCode !== undefined && errors.authCode !== undefined)
						? errors.authCode || ''
						: undefined
				}
			/>
			<Text align="center" className={styles['two-step-auth__resend-link']}>
				<Button theme="link" size="text" onClick={stub}>
					Resend
				</Button>
				{' Confirmation Code (after 60 sec.)'}
			</Text>
			<Button
				size="large"
				theme="secondary"
				fluid
				onClick={stub}
				type="submit"
				disabled={isLoading || !isValid}
			>
				{ isLoading ? 'Loading...' : 'Confirm' }
			</Button>
		</form>
	);
}

export default null;
