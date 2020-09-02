// @flow

import React from 'react';
import {
	shallow,
} from 'enzyme';
import {
	MemoryRouter,
} from 'react-router-dom';

import Tabs from '..';

const paths = [
	{
		path: 'test',
		label: 'test',
	},
	{
		path: 'test2',
		label: 'test2',
	},
	{
		path: 'test3',
		label: 'test3',
	},
];

describe('The Tabs component', () => {
	it('should renders correctly', () => {
		const wrapper = shallow(
			<MemoryRouter>
				<Tabs paths={paths} />
			</MemoryRouter>,
		);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
