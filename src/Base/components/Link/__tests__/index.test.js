// @flow

// TODO: TDD

import React from 'react';
import {
	MemoryRouter,
} from 'react-router-dom';
import {
	shallow,
	mount,
} from 'enzyme';

import Link from '..';

describe('The Link component', () => {
	it('should renders correctly', () => {
		const wrapper = shallow(
			<Link to="http://google.com">
				Link
			</Link>,
		);
		expect(wrapper.isEmptyRender()).not.toEqual(true);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render react-router-dom Link component', () => {
		const wrapper = mount(
			<MemoryRouter>
				<Link to="/home">
					Link
				</Link>
			</MemoryRouter>,
		);
		expect(wrapper.isEmptyRender()).not.toEqual(true);
		expect(wrapper.html()).toMatchSnapshot();
	});
});
