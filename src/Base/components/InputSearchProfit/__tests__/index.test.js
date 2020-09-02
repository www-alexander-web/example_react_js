// @flow

import React from 'react';
import {
	shallow,
} from 'enzyme';

import InputSearchProfit from '..';

describe('The InputSearchProfit component', () => {
	it('should renders correctly', () => {
		const wrapper = shallow(
			<InputSearchProfit
				onChange={() => {}}
				searchAction={() => {}}
				name="name"
				inputValue="value"
			/>,
		);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
