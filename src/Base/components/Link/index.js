// @flow

import React from 'react';
import cx from 'classnames';
import {
	Link as RRDLink,
	type LocationShape,
} from 'react-router-dom';

import styles from './Link.module.scss';

type LinkProps = {
	to: string | LocationShape,
	children: React$Node,
	className?: string,
	replace?: boolean,
	underlined: boolean,
};

const ExternalLinkRegExp = /^https?:\/\//;

const Link = ({
	to,
	children,
	className,
	replace,
	underlined,
}: LinkProps) => {
	if (typeof to === 'string' && ExternalLinkRegExp.test(to)) {
		return (
			<a
				href={to}
				className={cx(
					styles.link,
					className,
					{
						[styles['link--underlined']]: underlined,
					},
				)}
			>
				{underlined ? <span>{children}</span> : children}
			</a>
		);
	}

	return (
		<RRDLink
			to={to}
			className={cx(
				styles.link,
				className,
				{
					[styles['link--underlined']]: underlined,
				},
			)}
			replace={replace}
		>
			{underlined ? <span>{children}</span> : children}
		</RRDLink>
	);
};

Link.defaultProps = {
	underlined: false,
};

export default Link;
