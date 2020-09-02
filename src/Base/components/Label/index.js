// @flow

import React from 'react';
import cx from 'classnames';

import styles from './Label.module.scss';

type LabelProps = {
	className?: string,
	type?: 'success' | 'error' | 'warning',
	value: number | string,
};

const Label = ({
	className,
	type = 'success',
	value,
}: LabelProps) => (
	<span className={cx(styles.label, className, styles[type])}>{value}</span>
);

export default Label;
