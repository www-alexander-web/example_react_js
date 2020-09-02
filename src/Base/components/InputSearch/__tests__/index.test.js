// @flow

// TODO: TDD

import React from 'react';
import {
	shallow,
} from 'enzyme';

import InputSearch from '..';

describe('The InputSearch component', () => {
	it('should renders correctly', () => {
		const wrapper = shallow(
			<InputSearch
				name="search"
				value=""
				onChange={jest.fn()}
				onClick={jest.fn()}
			/>,
		);
		expect(wrapper.isEmptyRender()).not.toEqual(true);
		expect(wrapper.html()).toMatchSnapshot();
	});
});
