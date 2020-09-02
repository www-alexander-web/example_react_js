// @flow

// TODO: TDD
import React from 'react';
import {
	shallow,
} from 'enzyme';

import {
	Select,
} from '@base/components';

const options = [
	{
		value: 'test1',
		label: 'Test',
	},
	{
		value: 'test2',
		label: 'Info',
	},
	{
		value: 'test3',
		label: 'Address',
	},
];

describe('The Select component', () => {
	it('should renders correctly', () => {
		const wrapper = shallow(<Select options={[]} value="" name="test1" onChange={() => {}} />);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should renders correctly disabled', () => {
		const wrapper = shallow(<Select options={[]} value="" name="test2" onChange={() => {}} disabled />);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should renders correctly with options', () => {
		const wrapper = shallow(<Select options={options} value="test1" name="test3" onChange={() => {}} />);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
