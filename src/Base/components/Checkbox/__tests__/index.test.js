// @flow

// TODO: TDD

import React from 'react';
import {
	shallow,
} from 'enzyme';

import Checkbox from '..';

describe('The Checkbox component', () => {
	it('should renders correctly', () => {
		const mockOnChangeHandler = jest.fn();
		const wrapper = shallow(
			<Checkbox
				name="checkbox"
				label="Checkbox label"
				value={false}
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
			},
		};
		const mockOnChangeHandler = jest.fn();
		const wrapper = shallow(
			<Checkbox
				name="checkbox"
				label="Checkbox label"
				value={false}
				onChange={mockOnChangeHandler}
			/>,
		);
		const label = wrapper.find('input');
		label.simulate('change', mockEvent);
		expect(mockOnChangeHandler).toBeCalled();
		expect(mockOnChangeHandler).toBeCalledWith({
			name: 'checkbox',
			value: true,
			event: mockEvent,
		});
	});
});
