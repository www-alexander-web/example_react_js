// @flow

import React from 'react';
import {
	shallow,
} from 'enzyme';

import ChartOptionsInputs from '@base/components/ChartOptionsInputs';

import mockData from '../mockData';

describe('The ChartOptionsInputs component', () => {
	const actionInputChange = jest.fn();

	it('should renders correctly', () => {
		const wrapper = shallow(
			<ChartOptionsInputs
				values={mockData.values}
				touched={mockData.touched}
				errors={mockData.errors}
				handleChange={actionInputChange}
				handleBlur={() => {}}
			/>,
		);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
