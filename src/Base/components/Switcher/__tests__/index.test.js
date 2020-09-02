// @flow

// TODO: TDD
import React from 'react';
import {
	shallow,
} from 'enzyme';

import Switcher from '..';

describe('The Switcher component', () => {
	it('should renders correctly', () => {
		const wrapper = shallow(
			<Switcher
				name="test-switcher"
				value
				onChange={() => {}}
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
			<Switcher
				name="test-switcher"
				value
				onChange={mockOnChangeHandler}
			/>,
		);
		const label = wrapper.find('input');
		label.simulate('change', mockEvent);
		expect(mockOnChangeHandler).toBeCalled();
		expect(mockOnChangeHandler).toBeCalledWith({
			name: 'test-switcher',
			value: true,
			event: mockEvent,
		});
	});
});
