// @flow

import React,
{
	useCallback,
} from 'react';
import cx from 'classnames';

import styles from './Checkbox.module.scss';

export type CheckboxProps = {|
	label: string,
	name: string,
	value: boolean,
	onChange: ({
		name: string,
		value: boolean,
		event: SyntheticInputEvent<HTMLInputElement>
	}) => void,
	theme?: 'primary' | 'secondary',
|};

const Checkbox = ({
	label,
	name,
	value,
	onChange,
	theme,
}: CheckboxProps) => {
	const onChangeHandler = useCallback((event: SyntheticInputEvent<HTMLInputElement>) => {
		const {
			checked: inputValue,
		} = event.currentTarget;

		onChange({
			name,
			value: inputValue,
			event,
		});
	}, [
		onChange,
		name,
	]);

	return (
		<span
			className={cx(
				styles.checkbox,
				{
					[styles[`checkbox--theme--${theme || ''}`]]: theme,
				},
				{
					[styles['checkbox--checked']]: value,
				},
			)}
		>
			<label htmlFor={name} className={styles.checkbox__cursor}>
				<span
					className={cx(
						styles.checkbox__box,
						{
							[styles['checkbox__box--checked']]: value,
						},
					)}
				/>
				{ label }
			</label>
			<input
				id={name}
				name={name}
				type="checkbox"
				checked={value}
				onChange={onChangeHandler}
			/>
		</span>
	);
};

Checkbox.defaultProps = {
	theme: undefined,
};

export default Checkbox;
