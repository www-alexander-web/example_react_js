// @flow

// TODO: TDD

import React from 'react';
import {
	shallow,
} from 'enzyme';

import {
	AuthLayout,
} from '../index';

describe('The AuthLayout component', () => {
	it('renders correctly', () => {
		const wrapper = shallow(
			<AuthLayout>
				Hello World
			</AuthLayout>,
		);

		expect(wrapper.hasClass('auth-layout')).toBeTruthy();
		expect(wrapper.html()).toMatchSnapshot();
	});
});
