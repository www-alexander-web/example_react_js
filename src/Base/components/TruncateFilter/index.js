// @flow

import React from 'react';
import Truncate from 'react-truncate';

type Props = {
	children: React$Node,
	lines?: number | false,
	ellipsis?: string | React$Node,
	width?: number,
};

const TruncateFilter = ({
	children, lines = 1, ellipsis = '...', width = 0,
}: Props) => (
	<Truncate lines={lines} ellipsis={ellipsis} width={width}>
		{children}
	</Truncate>
);

export default TruncateFilter;
