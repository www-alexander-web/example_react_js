// @flow

import React,
{
	useEffect,
	useState,
	useCallback,
	useRef,
} from 'react';
import cx from 'classnames';
import {
	useDebouncedCallback,
} from 'use-debounce';

import type {
	SelectOptions,
} from '@base/types';
import useOnClickOutside from '@base/hooks/useOnClickOutside';

import Text from '../Text';

import styles from './SelectMulti.module.scss';

type SelectMultiProps = {|
	options: Array<SelectOptions<string>>,
	name: string,
	title: string,
	value: Array<string>,
	disabled: boolean,
	onChange: ({
		value: Array<string>,
		name: string,
	}) => void | Promise<void>,
	setFieldTouched?: (field: string, touched: boolean, shouldValidate: boolean) => void,
	className?: string,
	border?: 'solid' | 'dashed',
	error?: string | null | void,
	required?: boolean,
|};


const PADDING = 10;
const MIN_HEIGHT = 200;
const ONE_ELEMENT_HEIGHT = 30;
const REM_SIZE = 10;
const MARGIN_SIZE = -1;
const SELECT_HEIGHT = 4.2;
const MAX_BLOCK_SIZE = 30;

const SelectMulti = ({
	options,
	value: selectValues,
	name,
	onChange,
	setFieldTouched,
	disabled: selectDisabled,
	className,
	border,
	error,
	required,
	title,
}: SelectMultiProps) => {
	const [
		values,
		setValues,
	] = useState<Array<SelectOptions<string>>>([]);

	const [
		isOpen,
		setIsOpen,
	] = useState<boolean>(false);

	const [
		search,
		setSearch,
	] = useState<string>('');

	const [
		searchValues,
		setSearchValues,
	] = useState<Array<SelectOptions<string>>>(options);

	const [
		currentFocusElem,
		setCurrentFocusElem,
	] = useState<number>(0);

	const [
		positionContainer,
		setPositionContainer,
	] = useState<{top: number, left: number}>({
		top: 0,
		left: 0,
	});

	const [
		countVisibleItems,
		setCountVisibleItems,
	] = useState<number>(0);

	const menuRef = useRef(null);
	const selectRef = useRef(null);
	const searchInputRef = useRef(null);
	const itemRef = useRef(null);
	const listRef = useRef(null);
	const componentRef = useRef(null);

	const handleSelectChange = useCallback((obj: SelectOptions<string>) => {
		if (!values.some(({
			value,
		}) => value === obj.value)) {
			const valuesNew = [
				...values,
				obj,
			];
			setValues(valuesNew);
			onChange({
				name,
				value: valuesNew.map(({
					value,
				}) => value),
			});
		}
	}, [
		onChange,
		name,
		values,
		setValues,
	]);

	const handleValueRemove = useCallback((
		valueRemove: string,
		event: SyntheticInputEvent<HTMLButtonElement>,
	) => {
		event.stopPropagation();
		if (!selectDisabled) {
			const data = [];
			values.forEach((item) => {
				if (item.value !== valueRemove) {
					data.push(item);
				}
			});
			setValues(data);
			onChange({
				name,
				value: data.map(({
					value,
				}) => value),
			});
		}
		if (setFieldTouched !== undefined) {
			setFieldTouched(name, true, false);
		}
	}, [
		onChange,
		name,
		values,
		setValues,
		selectDisabled,
		setFieldTouched,
	]);

	useEffect(() => {
		const valuesNew = selectValues.map((item) => {
			const option = options.find(({
				value,
			}) => value === item);
			if (option === undefined) {
				onChange({
					name,
					value: [],
				});
			}
			return ({
				value: item,
				label: (option !== undefined && option.label) || '',
			});
		});
		setValues(valuesNew);
	}, [
		selectValues,
		options,
		onChange,
		name,
	]);

	const [
		isFlexInput,
		setIsFlexInput,
	] = useState<boolean>(true);


	const setInputFocus = () => {
		if (searchInputRef.current !== null) {
			searchInputRef.current.focus();
		}
	};

	const [
		showError,
		setShowError,
	] = useState<boolean>(true);

	useEffect(() => {
		if (isOpen && searchValues) {
			setInputFocus();
			setIsFlexInput(false);
		}

		if (!isOpen && searchInputRef.current) {
			searchInputRef.current.blur();
			setSearch('');
			setIsFlexInput(true);
			setShowError(true);
		}

		if (isOpen && menuRef && menuRef.current && itemRef
			&& itemRef.current && searchInputRef
			&& searchInputRef.current) {
			const menu: HTMLDivElement = menuRef.current;
			const item: HTMLLIElement = itemRef.current;
			setCurrentFocusElem(0);
			setCountVisibleItems(Math.trunc(menu.clientHeight / item.clientHeight));
		}
	}, [
		isOpen,
		searchValues,
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
		}
	}, [
		isOpen,
		options,
	]);

	useEffect(() => {
		setSearchValues([
			...options
				.filter((option) => !values.find((value) => option.value === value.value))
				.filter((option) => option.label.toLowerCase().includes(search.toLowerCase())),
		]);
		setCurrentFocusElem(0);
	}, [
		values,
		search,
		options,
	]);

	useEffect(() => {
		if (isOpen && menuRef && menuRef.current && searchInputRef && searchInputRef.current) {
			const menu: HTMLDivElement = menuRef.current;
			const input: HTMLInputElement = searchInputRef.current;
			let top = 0;
			if (window.innerHeight <= input.getBoundingClientRect().top + menu.offsetHeight) {
				top = -(menu.offsetHeight + 30);
			}
			setPositionContainer({
				top,
				left: input.offsetLeft,
			});
		}
	}, [
		searchValues,
		isOpen,
		values,
	]);

	const [
		wasFocused,
		setWasFocused,
	] = useState<boolean>(false);

	useOnClickOutside(componentRef, () => {
		setIsOpen(false);

		if (setFieldTouched !== undefined && wasFocused) {
			setFieldTouched(name, true, false);
		}
	});

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

	const handleKeyDown = useCallback((event: SyntheticKeyboardEvent<HTMLElement>) => {
		switch (event.key) {
			case 'Escape':
				setIsOpen(false);
				break;
			case 'ArrowUp':
				if (listRef.current && itemRef.current) {
					const list: HTMLUListElement = listRef.current;
					const item: HTMLLIElement = itemRef.current;
					const scrollTop = (currentFocusElem - countVisibleItems + 1) * item.clientHeight;
					if (countVisibleItems !== 0) {
						if (list.scrollTop > scrollTop && currentFocusElem < countVisibleItems - 1) {
							listRef.current.scrollTop = item.clientHeight * scrollTop;
						} else if (currentFocusElem < countVisibleItems - 1) {
							listRef.current.scrollTop = 0;
						} else {
							listRef.current.scrollTop = item.clientHeight * (currentFocusElem - countVisibleItems + 1);
						}
					}
				}
				if (currentFocusElem !== 0) {
					setCurrentFocusElem(currentFocusElem - 1);
				}
				break;
			case 'ArrowDown':
				if (listRef.current && itemRef.current) {
					const list: HTMLUListElement = listRef.current;
					const item: HTMLLIElement = itemRef.current;
					const scrollTop = (currentFocusElem - countVisibleItems + 2) * item.clientHeight;
					if (countVisibleItems !== 0) {
						if (list.scrollTop < scrollTop) {
							listRef.current.scrollTop = item.clientHeight * scrollTop;
						} else if (currentFocusElem < countVisibleItems - 2) {
							listRef.current.scrollTop = 0;
						} else {
							listRef.current.scrollTop = scrollTop + (item.clientHeight * 2);
						}
					}
				}
				if (currentFocusElem !== searchValues.length - 1) {
					setCurrentFocusElem(currentFocusElem + 1);
				}
				break;
			case 'Enter':
				if (searchValues[currentFocusElem]) {
					const {
						label, value,
					} = searchValues[currentFocusElem];
					setSearch('');
					handleSelectChange({
						label,
						value,
					});
				}
				break;
			default:
				break;
		}
	}, [
		currentFocusElem,
		handleSelectChange,
		searchValues,
		countVisibleItems,
	]);

	const handleSearchChange = (event: Event) => {
		if (event.target instanceof HTMLInputElement) {
			setSearch(event.target.value);
		}
	};

	const errorClickHandler = () => {
		if (showError) {
			setShowError(false);
			setInputFocus();
		}
	};

	const isError = error !== '' && error !== undefined && showError;

	return (
		<div className={styles['select-multi']}>
			<Text
				type="h5"
				color="gray"
				className={cx(
					styles['select-multi__label'],
					{
						[styles['select-multi__label--required']]: required,
					},
				)}
			>
				{title}
			</Text>
			<div
				role="button"
				className={cx(styles['select-multi__wrapper'], className)}
				onKeyDown={handleKeyDown}
				tabIndex="0"
				ref={componentRef}
				onClick={errorClickHandler}
			>
				<div
					className={cx(
						styles['select-multi__input'],
						{
							[styles['select-multi__input--disabled']]: selectDisabled,
							[styles[`select-multi__input--border--${border || ''}`]]: !isError && border,
							[styles['select-multi__input--error']]: isError,
						},
						className,
					)}
					onClick={() => !selectDisabled && setIsOpen(!isOpen)}
					onKeyPress={() => {}}
					tabIndex="-1"
					role="button"
					ref={selectRef}
				>
					{values.map(({
						value,
						label,
					}) => (
						<section key={value}>
							<button
								type="button"
								className={cx(styles['select-multi__button'],
									{
										[styles['select-multi__button--disabled']]: selectDisabled,
									})}
								onClick={(event) => handleValueRemove(value, event)}
							>
								{label}
								<i className="icon-close" />
							</button>
						</section>
					))}
					<input
						className={cx(styles['select-multi__input-search'],
							{
								[styles['select-multi__input-search--flex']]: isFlexInput,
								[styles['select-multi__input-search--none']]: selectDisabled,
							})}
						value={search}
						name={name}
						onFocus={() => setWasFocused(true)}
						onChange={handleSearchChange}
						ref={searchInputRef}
					/>
					<div className={styles['select-multi__icon']}>
						<i className="icon-down-open" />
					</div>
				</div>
				<div className={styles['select-multi__box']}>
					{ isOpen && (
						<div
							ref={menuRef}
							className={styles['select-multi__container']}
							tabIndex="-1"
							onBlur={handleMenuBlur}
							role="listbox"
							style={{
								marginBlockStart: `${MARGIN_SIZE}rem`,
								top: positionContainer.top,
								left: positionContainer.left,
							}}
						>
							<ul
								className={styles['select-multi__menu']}
								style={{
									maxBlockSize: `${MAX_BLOCK_SIZE}rem`,
								}}
								ref={listRef}
							>
								{searchValues.map(({
									value, label, disabled,
								}, index) => (
									<li key={value} className={styles['select-multi__item']} ref={itemRef}>
										<button
											className={cx(
												styles['select-multi__element'],
												{
													[styles['select-multi__element--disabled']]: disabled,
												},
												{
													[styles['select-multi__element--active']]: values.some((obj) => value === obj.value),
												},
												{
													[styles['select-multi__element--focus']]: index === currentFocusElem,
												},
											)}
											type="button"
											onClick={() => {
												setSearch('');
												handleSelectChange({
													value,
													label,
												});
											}}
										>
											{label}
										</button>
									</li>
								))}
								{searchValues.length < 1 && (
									<li>
										<button
											className={cx(
												styles['select-multi__element'],
												styles['select-multi__element--disabled'],
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
				{error !== undefined && error !== null && error.length > 0 && (
					<span
						className={styles['select-multi__error']}
						style={{
							visibility: showError ? 'visible' : 'hidden',
						}}
					>
						{ error }
					</span>
				)}
			</div>
		</div>
	);
};

SelectMulti.defaultProps = {
	disabled: false,
	className: '',
	border: 'dashed',
};

export default SelectMulti;
