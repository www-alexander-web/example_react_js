// @flow

import React from 'react';
import cx from 'classnames';

import type {
	SelectOptions,
} from '@base/types';

import styles from './RadioButton.module.scss';


type RadioButtonProps<T> = {
	name: string,
	value: string,
	options: Array<SelectOptions<T>>,
	onChange: ({
		name: string,
		value: string,
		event: SyntheticInputEvent<HTMLInputElement>
	}) => void,
	className?: string,
	classNameInputWrap?: string,
}

const RadioButton = <T: string>({
	options,
	name,
	value: activeValue,
	onChange,
	className,
	classNameInputWrap,
}: RadioButtonProps<T>) => {
	const handleValueChange = React.useCallback((event: SyntheticInputEvent<HTMLInputElement>) => {
		const {
			dataset: {
				value,
			},
		} = event.currentTarget;

		onChange({
			name,
			value,
			event,
		});
	}, [
		onChange,
		name,
	]);

	return (
		<div className={cx(styles['radio-button'], className)}>
			{options.map(({
				value,
				label,
				disabled,
			}) => (
				<div
					key={value}
					className={cx(
						styles['radio-button__item'],
						classNameInputWrap,
						{
							[styles['radio-button__item--checked']]: value === activeValue,
						},
					)}
				>
					<label
						htmlFor={`${name}-${value}`}
						className={cx(
							styles['radio-button__box'],
							{
								[styles['radio-button__box--checked']]: value === activeValue,
							},
							{
								[styles['radio-button__box--disabled']]: disabled,
							},
						)}
					>
						{ label }
					</label>
					<input
						id={`${name}-${value}`}
						type="radio"
						name={name}
						value={value}
						data-value={value}
						onChange={handleValueChange}
						checked={value === activeValue}
						disabled={disabled}
					/>
				</div>
			))}
		</div>
	);
};

export default RadioButton;
