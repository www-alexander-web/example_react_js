// @flow

// TODO: TDD
import React from 'react';
import {
	shallow,
} from 'enzyme';

import Footer from '..';

describe('The Footer component', () => {
	it('should renders correctly', () => {
		const wrapper = shallow(<Footer />);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
