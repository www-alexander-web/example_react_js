// @flow

// TODO: TDD
import React from 'react';
import {
	shallow,
} from 'enzyme';

import RadioButton from '..';

const options = [
	{
		value: 'NONE',
		label: 'None',
	},
	{
		value: 'ONE',
		label: 'One',
	},
	{
		value: 'ALL',
		label: 'All',
	},
];

describe('The RadioButton component', () => {
	it('should renders correctly', () => {
		const mockOnChangeHandler = jest.fn();
		const wrapper = shallow(
			<RadioButton
				options={options}
				name="radio-button"
				value="NONE"
				onChange={mockOnChangeHandler}
			/>,
		);
		expect(wrapper.isEmptyRender()).not.toEqual(true);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should return correct callback value', () => {
		const mockEvent = {
			currentTarget: {
				checked: true,
				dataset: {
					value: 'NONE',
				},
			},
		};
		const mockOnChangeHandler = jest.fn();
		const wrapper = shallow(
			<RadioButton
				name="radio-button"
				options={options}
				value="ONE"
				onChange={mockOnChangeHandler}
			/>,
		);
		const label = wrapper.find('#radio-button-NONE');
		label.simulate('change', mockEvent);
		expect(mockOnChangeHandler).toBeCalled();
		expect(mockOnChangeHandler).toBeCalledWith({
			name: 'radio-button',
			value: 'NONE',
			event: mockEvent,
		});
	});
});
