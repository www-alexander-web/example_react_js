// @flow

// TODO: TDD
import React from 'react';
import {
	shallow,
} from 'enzyme';
import {
	MemoryRouter,
} from 'react-router-dom';

import BreadCrumbs from '..';

const paths = [
	{
		path: '/test',
		label: 'Test',
	},
	{
		path: '/test/info',
		label: 'Info',
	},
	{
		path: '/test/info/address',
		label: 'Address',
	},
];

describe('The BreadCrumbs component', () => {
	it('should renders correctly', () => {
		const wrapper = shallow(
			<MemoryRouter>
				<BreadCrumbs paths={paths} />
			</MemoryRouter>,
		);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
