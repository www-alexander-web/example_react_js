// @flow

import React,
{
	useState,
	useEffect,
	useRef,
} from 'react';
import cx from 'classnames';

import {
	Text,
} from '@base/components';
import SearchButton from '@base/components/SearchButton';
import useOnClickOutside from '@base/hooks/useOnClickOutside';

import styles from './index.module.scss';
import Item from './Item';

type InputSearchProfitProps = {|
	searchAction: () => void,
	onChange: ({
		name: string,
		value: string,
		event?: SyntheticInputEvent<HTMLInputElement>,
	}) => void | Promise<void>,
	inputValue: string,
	name: string,
	className?: string,
	placeholder?: string,
|};

type SearchTypes = Array<{|
	label: 'Profile ID' | 'Session ID' | 'Group ID',
	value: 'profileID' | 'sessionID' | 'groupID',
	hasOnlyNumbers?: boolean,
	hasOnlyNumberAndLetters?: boolean,
	isEmail?: boolean
|}>;

type Regex = {|
	hasOnlyNumbers: RegExp,
	hasOnlyNumberAndLetters: RegExp,
|}

const SEARCH_TYPES: SearchTypes = [
	{
		label: 'Profile ID',
		value: 'profileID',
		hasOnlyNumbers: true,

	},
	{
		label: 'Session ID',
		value: 'sessionID',
		hasOnlyNumbers: true,
		hasOnlyNumberAndLetters: true,
	},
	{
		label: 'Group ID',
		value: 'groupID',
		hasOnlyNumbers: true,
		hasOnlyNumberAndLetters: true,
	},
];

const REGEX: Regex = {
	hasOnlyNumbers: /^[\d]+$/,
	hasOnlyNumberAndLetters: /^[a-z0-9]+$/i,
};

const InputSearchProfit = ({
	searchAction,
	onChange,
	inputValue,
	name,
	className,
	placeholder,
}: InputSearchProfitProps) => {
	const [
		inputFocused,
		setInputFocused,
	] = useState<boolean>(false);
	const [
		filteredSearchTypes,
		setFilteredSearchTypes,
	] = useState<SearchTypes>([]);
	const [
		currentFocusElement,
		setCurrentFocusElement,
	] = useState<number>(0);
	const [
		menuIsOpen,
		setMenuIsOpen,
	] = useState<boolean>(false);
	const [
		isLabeled,
		setIsLabeled,
	] = useState<boolean>(false);

	const inputRef = useRef<HTMLInputElement | null>(null);
	const inputWrapperRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setMenuIsOpen(inputFocused && filteredSearchTypes.length > 0 && inputValue !== '');
	}, [
		inputFocused,
		filteredSearchTypes.length,
		inputValue,
	]);
	useEffect(() => {
		if (!inputFocused && inputRef.current !== null) {
			inputRef.current.blur();
		}
	}, [
		inputFocused,
	]);
	useEffect(() => {
		if (filteredSearchTypes[currentFocusElement]) {
			onChange({
				name: 'searchType',
				value: filteredSearchTypes[currentFocusElement].value,
			});
		} else if (filteredSearchTypes.length > 0) {
			setCurrentFocusElement(0);
			onChange({
				name: 'searchType',
				value: filteredSearchTypes[0].value,
			});
		}
	}, [
		onChange,
		filteredSearchTypes,
		currentFocusElement,
	]);

	const handleItemClick = () => {
		setIsLabeled(true);
		setInputFocused(false);
		searchAction();
	};

	useOnClickOutside(inputWrapperRef, () => {
		if (inputValue && inputFocused) {
			handleItemClick();
		}
		setInputFocused(false);
	});

	const handleChange = (event: SyntheticInputEvent<HTMLInputElement>): void => {
		const {
			value,
		} = event.target;


		let filter: 'hasOnlyNumbers' | 'hasOnlyNumberAndLetters';

		if (REGEX.hasOnlyNumbers.test(value)) {
			filter = 'hasOnlyNumbers';
		} else if (REGEX.hasOnlyNumberAndLetters.test(value)) {
			filter = 'hasOnlyNumberAndLetters';
		}

		setFilteredSearchTypes(SEARCH_TYPES.filter((type) => type[filter]));

		onChange({
			value,
			name,
			event,
		});
	};
	const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
		switch (event.key) {
			case 'Escape': {
				setInputFocused(false);
				setCurrentFocusElement(0);
				onChange({
					name,
					value: '',
				});
				searchAction();
				break;
			}
			case 'ArrowUp': {
				event.preventDefault();
				if (filteredSearchTypes.length > 0 && currentFocusElement > 0) {
					setCurrentFocusElement((prevElement) => prevElement - 1);
				}
				break;
			}
			case 'ArrowDown': {
				const typesLength = filteredSearchTypes.length;
				if (typesLength > 0 && currentFocusElement < typesLength - 1) {
					setCurrentFocusElement((prevElement) => prevElement + 1);
				}
				break;
			}
			case 'Enter': {
				event.preventDefault();
				if (menuIsOpen) {
					handleItemClick();
				} else {
					searchAction();
				}
				break;
			}
			default:
				break;
		}
	};

	return (
		<div className={cx(styles['profit-search'], className)}>
			<div
				className={styles['profit-search__input-wrapper']}
				ref={inputWrapperRef}
			>
				{isLabeled && (
					<div className={styles['profit-search__label']}>
						<Text
							color="gray"
							className={styles['profit-search__label__text']}
						>
							{filteredSearchTypes[currentFocusElement].label}
						</Text>
					</div>
				)}
				<input
					ref={inputRef}
					name={name}
					value={inputValue}
					onKeyDown={handleKeyDown}
					onChange={handleChange}
					placeholder={placeholder}
					onFocus={() => {
						setIsLabeled(false);
						setInputFocused(true);
					}}
					className={cx(
						styles['profit-search__input'],
						{
							[styles['profit-search__input--labeled']]: isLabeled,
						},
					)}
				/>
				{menuIsOpen && (
					<ul className={styles['profit-search__menu']}>
						{filteredSearchTypes.map((type, index) => (
							<Item
								searchType={type.label}
								value={inputValue}
								key={type.value}
								focused={index === currentFocusElement}
								onClick={handleItemClick}
								onMouseEnter={() => setCurrentFocusElement(index)}
							/>
						))}
					</ul>
				)}
			</div>
			<SearchButton
				onClick={() => searchAction()}
				className={styles['profit-search__button']}
			/>
		</div>
	);
};


export default InputSearchProfit;
