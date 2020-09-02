// @flow

import React, {
	useCallback,
	useRef,
	useState,
} from 'react';
import cx from 'classnames';

import { getValueForNumberInput } from '@base/utils/functions';
import textStyles from '@base/components/Text/Text.module.scss';
import Pattern from '@base/constants/pattern';

import Text from '../Text';

import styles from './Input.module.scss';

type InputProps = {
	name: string,
	value: string | number,
	label?: string,
	placeholder?: string,
	type?: 'text' | 'password' | 'integer' | 'float',
	size?: 'small' | 'large',
	numberAfterPoint?: number,
	className?: string,
	onChange: ({
		name: string,
		value: string | number,
		event?: SyntheticInputEvent<HTMLInputElement>,
	}) => void | Promise<void>,
	onBlur?: (event: SyntheticInputEvent<HTMLInputElement>) => void,
	onFocus?: (event: SyntheticInputEvent<HTMLInputElement>) => void,
	error?: string,
	disabled?: boolean,
	min?: void | number,
	max?: void | number,
	step?: void | number,
	align?: 'left' | 'center' | '',
	required?: boolean,
};

const Input = ({
	name,
	value,
	label = '',
	type = 'text',
	placeholder,
	onChange,
	onBlur,
	onFocus,
	disabled = false,
	className,
	error,
	min = 0,
	max = 10000,
	step = 1,
	size = 'large',
	align,
	required = false,
	numberAfterPoint,
}: InputProps) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [	isShowPass,	setShowPass ] = useState(false);
	const [	showError, setShowError	] = useState<boolean>(true);
	const typeIsNumber: boolean = type === 'float' || type === 'integer';
	let pattern: RegExp | void;
	if (type === 'float') {
		pattern = Pattern.onlyFloat;
	} else if (type === 'integer') {
		pattern = Pattern.onlyInteger;
	}

	const setFocus = () => {
		if (inputRef.current !== null) {
			inputRef.current.focus();
		}
	};
	const errorClickHandler = () => {
		if (showError) {
			setShowError(false);
			setFocus();
		}
	};
	const onToggleShow = useCallback(
		() => setShowPass((currentState) => !currentState),
		[
			setShowPass,
		],
	);

	const stepBase = (newValue: number | string, condition: boolean, down?: boolean) => {
		setFocus();
		if (Number(newValue) < min || value === '') {
			const getValue = () => {
				if (down === true && Number(value) - step < min) {
					return Number(value);
				}
				return min > step ? min : step;
			};
			onChange({
				name,
				value: getValue(),
			});
		} else if (Number(newValue) > max) {
			onChange({
				name,
				value: max,
			});
		} else if (condition) {
			onChange({
				name,
				value: newValue,
			});
		}
	};
	const stepUp = () => {
		stepBase(
			getValueForNumberInput(parseFloat(value) + step, numberAfterPoint || 0),
			!Number.isNaN(parseFloat(value))	&& parseFloat(value) < max,
		);
	};
	const stepDown = () => {
		stepBase(
			getValueForNumberInput(parseFloat(value) - step, numberAfterPoint || 0),
			!Number.isNaN(parseFloat(value)) && parseFloat(value) > min,
			true,
		);
	};

	const onKeyDownHandler = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			stepUp();
		}
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			stepDown();
		}
	};
	const handleChange = useCallback((event: SyntheticInputEvent<HTMLInputElement>) => {
		const eventValue = event.currentTarget.value;
		const newInputValue = typeIsNumber ? eventValue.replace(',', '.') : eventValue;
		if (pattern === undefined || pattern.test(newInputValue)) {
			if (typeIsNumber) {
				onChange({
					name,
					value: getValueForNumberInput(newInputValue, numberAfterPoint || 0),
				});
			} else {
				onChange({
					name,
					value: newInputValue,
					event,
				});
			}
		}
	}, [
		onChange,
		name,
		pattern,
		numberAfterPoint,
		typeIsNumber,
	]);
	const blurHandler = (e) => {
		// if click of arrow in input number prevent blur
		const isButtonClicked = [
			'stepUp',
			'stepDown',
		].includes(e.relatedTarget ? e.relatedTarget.id : '');

		if (!isButtonClicked) {
			setShowError(true);
			if (onBlur !== undefined) {
				onBlur(e);
			}
		}
	};

	return (
		<>
			{label.length > 0 && size === 'small' && (
				<Text
					type="h5"
					color="gray"
					className={cx(
						styles.title,
						{
							[styles.required]: required,
						},
					)}
				>
					{label}
				</Text>
			)}
			<span
				className={cx(
					styles.input,
					textStyles.text,
					styles[`input--${size}`],
					className,
					{
						[styles['input--error']]: error !== '' && error !== undefined && showError,
					},
				)}
				role="presentation"
				onClick={errorClickHandler}
			>
				{label.length > 0 && size === 'large' && (
					<label
						htmlFor={name}
						className={required ? styles.required : ''}
					>
						{label}
					</label>
				)}
				<input
					ref={inputRef}
					id={name}
					name={name}
					placeholder={placeholder}
					type={isShowPass || typeIsNumber ? 'text' : type}
					value={
						typeIsNumber
							? getValueForNumberInput(value, numberAfterPoint || 0)
							: value
					}
					onChange={handleChange}
					autoComplete="off"
					onBlur={blurHandler}
					onFocus={onFocus}
					onKeyDown={onKeyDownHandler}
					disabled={disabled}
					min={min}
					max={max}
					step={step}
					className={cx(styles.position, {
						[styles[`position--align--${align || ''}`]]: align,
					})}
				/>
				{type === 'password' && (
					<button
						type="button"
						onClick={onToggleShow}
						className={styles['input__eye-btn']}
					>
						{isShowPass ? (
							<>
								<i className="icon-eye-off" />
								Hide
							</>
						) : (
							<>
								<i className="icon-eye" />
								Show
							</>
						)}
					</button>
				)}
				{typeIsNumber && !disabled && (
					<div className={styles['input__buttons-group']}>
						<button
							className={styles['input__buttons-group__button']}
							type="button"
							id="stepUp"
							onClick={stepUp}
						>
							<i
								className={cx(
									'icon-up-open-mini',
									styles['input__buttons-group__button__icon'],
								)}
							/>
						</button>
						<button
							className={styles['input__buttons-group__button']}
							type="button"
							id="stepDown"
							onClick={stepDown}
						>
							<i
								className={cx(
									'icon-down-open-mini',
									styles['input__buttons-group__button__icon'],
								)}
							/>
						</button>
					</div>
				)}
				{error !== undefined && error.length > 0 && (
					<span
						className={styles.input__error}
						style={{
							visibility: showError ? 'visible' : 'hidden',
						}}
					>
						{ error }
					</span>
				)}
			</span>
		</>
	);
};

Input.propTypes = {
	numberAfterPoint(props) {
		const { type, numberAfterPoint } = props;
		if (type === 'float' && numberAfterPoint === undefined) {
			return new Error('Please provide a numberAfterPoint value with float type in Input component');
		}
		return null;
	},
};

export default Input;
