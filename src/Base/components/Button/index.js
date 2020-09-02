// @flow

import * as React from 'react';
import cx from 'classnames';

import styles from './Button.module.scss';

type ButtonProps = {
	children: React$Node,
	onClick: (event?: SyntheticEvent<HTMLButtonElement>) => void,
	disabled?: boolean,
	fluid?: boolean,
	type?: 'button' | 'submit' | 'reset',
	theme?: 'default' | 'primary' | 'secondary' | 'link' | 'back' | 'download' | 'icon' | 'start-bot',
	size?: 'mini'
		| 'tiny'
		| 'small'
		| 'medium'
		| 'large'
		| 'big'
		| 'huge'
		| 'massive'
		| 'text',
	className?: string,
};

const Button = ({
	children,
	onClick,
	disabled,
	fluid,
	type,
	theme,
	size,
	className,
}: ButtonProps) => (
	<button
		onClick={onClick}
		disabled={disabled}
		type={type}
		className={cx(
			styles.button,
			{
				[styles[`button--theme--${theme || ''}`]]: theme,
				[styles['button--fluid']]: fluid,
				[styles[`button--size--${size || ''}`]]: size,
			},
			className,
		)}
	>
		{theme === 'download' && (
			<i className="icon-download" />
		)}
		<span className={styles.button__content}>
			{ children }
		</span>
	</button>
);

Button.defaultProps = {
	disabled: false,
	fluid: false,
	type: 'button',
	theme: 'default',
	size: 'medium',
	className: '',
};

export default React.memo<ButtonProps>(Button);
