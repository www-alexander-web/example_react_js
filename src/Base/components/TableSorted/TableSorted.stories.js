// @flow

import React from 'react';
import {
	storiesOf,
} from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import {
	TableSorted,
} from '@base/components';

const columns = [
	{
		id: 'id',
		header: 'ID',
		isSort: true,
	},
	{
		id: 'info',
		header: 'Info',
		isSort: true,
	},
	{
		id: 'amount',
		header: 'Amount',
		isSort: true,
	},
];

const data = [
	{
		id: '1',
		info: 'test',
		amount: '$ 1000',
	},
	{
		id: '4',
		info: 'q',
		amount: '$ 3000',
	},
	{
		id: '2',
		info: 's',
		amount: '$ 1',
	},
	{
		id: '3',
		info: 'se',
		amount: '$ 1000',
	},
	{
		id: '5',
		info: 's',
		amount: '$ 10',
	},
];

storiesOf('UI', module).add('TableSorted', () => (
	<div style={{
		margin: 10,
	}}
	>
		<h5>TableSorted component</h5>
		<TableSorted
			columns={columns}
			data={data}
			pageSize={2}
			isLoading={false}
		/>
	</div>
));
