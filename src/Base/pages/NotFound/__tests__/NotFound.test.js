// @flow

// TODO: TDD

import {
	shallow,
} from 'enzyme';
import React from 'react';

import {
	NotFound,
} from '..';

const component = <NotFound />;

describe('The NotFound component', () => {
	it('renders correctly', () => {
		const wrapper = shallow(component);
		expect(wrapper.hasClass('not-found')).toBeTruthy();

		expect(wrapper.html()).toMatchSnapshot();
	});
});
