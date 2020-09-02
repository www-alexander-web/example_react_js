// @flow

import * as React from 'react';
import cx from 'classnames';

import styles from './Text.module.scss';

type TextProps = {
	type?: 'h1' | 'h1-extra' | 'h2' | 'h2-extra' | 'h3' | 'h4' | 'h5' | 'h6' | '',
	children: React$Node,
	className?: string,
	align?: 'left' | 'center' | 'right',
	color?: 'primary' | 'white' | 'gray' | 'gray-light' | 'gray-dark' | 'black' | 'green' | '',
};

const Text = ({
	children,
	type,
	className,
	align,
	color,
}: TextProps) => (
	<span
		className={cx(
			styles.text,
			{
				[styles[`text--type--${type || ''}`]]: type,
				[styles[`text--align--${align || ''}`]]: align,
				[styles[`text--color--${color || ''}`]]: color,
			},
			className,
		)}
	>
		{children}
	</span>
);

Text.defaultProps = {
	type: '',
	className: '',
	align: 'left',
	color: '',
};

export default React.memo<TextProps>(Text);
