// @flow

import React from 'react';
import cx from 'classnames';

import Input from '../Input';
import SearchButton from '../SearchButton';

import styles from './InputSearch.module.scss';

type InputSearchProps = {|
	name: string,
	value: string,
	onChange: ({
		name: string,
		value: string | number,
		event?: SyntheticInputEvent<HTMLInputElement>,
	}) => void,
	onClick: () => void,
	placeholder?: string,
	className?: string,
|};

const InputSearch = ({
	className,
	name,
	value,
	placeholder,
	onChange,
	onClick,
}: InputSearchProps) => (
	<div className={cx(styles['input-search'], className)}>
		<Input
			className={styles['input-search__input']}
			type="text"
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
		<SearchButton onClick={onClick} />
	</div>
);

InputSearch.defaultProps = {
	placeholder: '',
	className: '',
};

export default InputSearch;
