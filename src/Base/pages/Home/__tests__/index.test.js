// @flow

// TODO: TDD

import {
	shallow,
} from 'enzyme';
import {
	MemoryRouter,
} from 'react-router-dom';
import React from 'react';

import {
	Home,
} from '..';

const component = (
	<MemoryRouter initialEntries={[
		'/',
	]}
	>
		<Home to="/" />
	</MemoryRouter>
);
describe('The Home component', () => {
	it('renders correctly', () => {
		const wrapper = shallow(component);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
