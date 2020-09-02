// @flow

// TODO: TDD
import React from 'react';
import {
	shallow,
} from 'enzyme';

import Table from '..';

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

describe('The Table component', () => {
	it('should renders correctly', () => {
		const onChangeMock = jest.fn();
		const wrapper = shallow(
			<Table
				nameSort="sort"
				valueSort=""
				onChangeSort={onChangeMock}
				nameOrder="order"
				valueOrder="asc"
				onChangeOrder={onChangeMock}
				namePage="page"
				valuePage={0}
				onChangePage={onChangeMock}
				columns={columns}
				data={data}
				isLoading={false}
				valueCount={5}
			/>,
		);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
