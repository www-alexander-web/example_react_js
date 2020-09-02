/* eslint-disable jsx-a11y/click-events-have-key-events */
// @flow

import React, {
	useEffect,
	useState,
	useRef,
	useCallback,
} from 'react';
import cx from 'classnames';
import {
	useDebouncedCallback,
} from 'use-debounce';

import {
	setNativeValue,
} from '@base/utils/functions';
import type {
	SelectOptions,
} from '@base/types';

import styles from './Select.module.scss';

type MenuParameters = {
	maxHeight: number,
	isTop: boolean,
};

export type OnChangeValue = {
	name: string,
	value: string,
	event?: SyntheticInputEvent<HTMLInputElement>,
};

export type SelectProps<T> = {|
	name: string,
	value: string,
	options: Array<SelectOptions<T>>,
	disabled: boolean,
	onChange: ({
		name: string,
		value: string,
		event?: SyntheticInputEvent<HTMLInputElement>,
	}) => void,
	className: string,
	classNameField?: string,
	error: boolean,
|}

const defaultSelect: SelectOptions<string> = {
	value: '',
	label: '',
};
const PADDING = 10;
const MIN_HEIGHT = 60;
const ONE_ELEMENT_HEIGHT = 30;
const REM_SIZE = 10;
const BORDER_SIZE = 2;
const MARGIN_SIZE = 0.7;
const SELECT_HEIGHT = 4.2;
const MAX_BLOCK_SIZE = 30;
const eventNew = new Event('input', {
	bubbles: true,
});

const Select = <T: string>({
	name,
	value: activeValue,
	options,
	onChange,
	className,
	disabled: selectDisabled,
	classNameField,
	error,
}: SelectProps<T>) => {
	const [
		selectedObj,
		setSelectedObj,
	] = useState(defaultSelect);
	const [
		isOpen,
		setIsOpen,
	] = useState<boolean>(false);
	const [
		menuParam,
		setMenuParam,
	] = useState<MenuParameters>({
		maxHeight: 0,
		isTop: false,
	});
	const inputRef = useRef(null);
	const menuRef = useRef(null);
	const selectRef = useRef(null);

	useEffect(() => {
		const selectObjNew = options.find(({
			value,
		}) => value === activeValue);
		if (selectObjNew) {
			setSelectedObj(selectObjNew);
		} else {
			setSelectedObj(defaultSelect);
		}
	}, [
		activeValue,
		options,
	]);
	useEffect(() => {
		if (isOpen && menuRef && menuRef.current) {
			const menu: HTMLDivElement = menuRef.current;
			menu.focus();
		}
	}, [
		isOpen,
	]);

	useEffect(() => {
		if (isOpen && selectRef && selectRef.current) {
			const select: HTMLDivElement = selectRef.current;
			const selectY = select.getBoundingClientRect().top;
			const bodyHeight = document.body ? document.body.clientHeight : 0;
			let maxHeight = bodyHeight - selectY - (SELECT_HEIGHT + MARGIN_SIZE) * REM_SIZE - PADDING;
			const isTop = maxHeight < MIN_HEIGHT;
			if (isTop) {
				const menuHeight = options.length * ONE_ELEMENT_HEIGHT;
				const topSize = selectY - MARGIN_SIZE * REM_SIZE - PADDING;
				maxHeight = menuHeight > topSize ? topSize : menuHeight;
			}
			setMenuParam({
				maxHeight: maxHeight / REM_SIZE,
				isTop,
			});
		}
	}, [
		isOpen,
		options,
	]);

	const [
		handleIsOpenChange,
	] = useDebouncedCallback((value: boolean) => {
		setIsOpen(value);
	}, 200);

	const handleMenuBlur = useCallback((event: {relatedTarget: null | HTMLElement}) => {
		if (menuRef && menuRef.current) {
			const menu: HTMLDivElement = menuRef.current;
			if (event.relatedTarget === null || !menu.contains(event.relatedTarget)) {
				handleIsOpenChange(false);
			}
		}
	}, [
		menuRef,
		handleIsOpenChange,
	]);

	const handleSelectChange = useCallback((obj: SelectOptions<T>) => {
		handleIsOpenChange(false);
		setSelectedObj(obj);

		if (inputRef && inputRef.current) {
			const input: HTMLInputElement = inputRef.current;
			setNativeValue(input, obj.value);
			input.dispatchEvent(eventNew);
		}
	}, [
		inputRef,
		handleIsOpenChange,
	]);

	const handleInputChange = useCallback((event: SyntheticInputEvent<HTMLInputElement>) => {
		onChange({
			name,
			value: event.target.value,
			event,
		});
	}, [
		onChange,
		name,
	]);

	const {
		value: selectedValue, label: selectedLabel,
	} = selectedObj;
	const {
		maxHeight, isTop,
	} = menuParam;
	return (
		<div
			className={cx(
				styles.select,
				className,
			)}
		>
			<div
				className={cx(
					styles.select__field,
					classNameField,
					{
						[styles['select__field--open']]: isOpen,
					},
					{
						[styles['select__field--disabled']]: selectDisabled,
					},
					{
						[styles.select__error]: error,
					},
				)}
				onClick={() => !selectDisabled && handleIsOpenChange(!isOpen)}
				tabIndex="-1"
				role="button"
				ref={selectRef}
			>
				<label htmlFor={name} className={styles.select__text} title={selectedLabel || 'select..'}>
					{selectedLabel === 'empty' ? ' ' : selectedLabel || 'select..'}
				</label>
				<div className={styles.select__icon}>
					<i className="icon-down-open" />
				</div>
				<input
					id={name}
					type="text"
					name={name}
					value={selectedValue}
					ref={inputRef}
					onChange={handleInputChange}
					disabled
				/>
			</div>
			<div className={styles.select__box}>
				{ isOpen && (
					<div
						ref={menuRef}
						className={styles.select__container}
						tabIndex="-1"
						onBlur={handleMenuBlur}
						role="listbox"
						style={{
							marginBlockStart: isTop ? `calc( -${maxHeight}rem - ${MARGIN_SIZE + SELECT_HEIGHT}rem - ${BORDER_SIZE}px )`
								: `${MARGIN_SIZE}rem`,
						}}
					>
						<ul
							className={styles.select__menu}
							style={{
								maxBlockSize: `${MAX_BLOCK_SIZE}rem`,
							}}
						>
							{options.map(({
								value, label, disabled,
							}) => (
								<li key={value} className={styles.select__item}>
									<button
										className={cx(
											styles.select__element,
											{
												[styles['select__element--disabled']]: disabled,
											},
											{
												[styles['select__element--active']]: value === selectedValue,
											},
										)}
										type="button"
										onClick={() => handleSelectChange({
											value,
											label,
										})}
										title={label}
									>
										{label}
									</button>
								</li>
							))}
							{options.length < 1 && (
								<li>
									<button
										className={cx(
											styles.select__element,
											styles['select__element--disabled'],
										)}
										type="button"
										disabled
									>
										no content available
									</button>
								</li>
							)}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

Select.defaultProps = {
	disabled: false,
	className: '',
	error: false,
};

export default Select;
