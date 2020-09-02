// @flow

import React from 'react';
import {
	storiesOf,
} from '@storybook/react';
import {
	action,
} from '@storybook/addon-actions';

import {
	Table,
} from '@base/components';

const actionChange = action('Table action');

const columns = [
	{
		id: 'id',
		header: 'ID',
		isSort: false,
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
	{
		id: 'test',
		header: 'Test',
		isSort: true,
	},
];

const data = [
	{
		id: '1',
		info: 'test testtesttesttest testtest    test test test test test test test test  test test test test v test test test test test test test testtesttesttest testtest    test test test test test test test test  test test test test v test test test test test testtest testtesttesttest testtest    test test test test test test test test  test test test test v test test test test test testtest testtesttesttest testtest    test test test test test test test test  test test test test v test test test test test testtest testtesttesttest testtest    test test test test test test test test  test test test test v test test test test test testtest testtesttesttest testtest    test test test test test test test test  test test test test v test test test test test test',
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

storiesOf('Basic', module).add('Table', () => (
	<div style={{
		margin: 10,
	}}
	>
		<h5>Table component</h5>
		<Table
			nameSort="sort"
			valueSort=""
			onChangeSort={actionChange}
			nameOrder="order"
			valueOrder="asc"
			onChangeOrder={actionChange}
			namePage="page"
			valuePage={0}
			onChangePage={actionChange}
			columns={columns}
			data={data}
			isLoading={false}
			valueCount={data.length}
		/>
	</div>
));
