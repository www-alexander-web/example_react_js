// @flow

import React from 'react';
import cx from 'classnames';

import Button from '../Button';

import styles from './index.module.scss';


type SearchButtonProps = {
	className: string,
	onClick: () => void,
};

const SearchButton = ({
	className,
	onClick,
}: SearchButtonProps) => (
	<Button
		className={cx(
			styles['search-button'],
			className,
		)}
		theme="secondary"
		type="button"
		onClick={onClick}
	>
		<i className="icon-icon" />
	</Button>
);

SearchButton.defaultProps = {
	className: '',
};

export default SearchButton;
