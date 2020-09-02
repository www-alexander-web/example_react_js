// @flow

// TODO: TDD

import React from 'react';
import {
	shallow,
} from 'enzyme';

import Input from '..';

describe('The Input component', () => {
	it('should renders correctly', () => {
		const value = 'ssss';
		const onChangeHandler = jest.fn();
		const wrapper = shallow(
			<Input name="input" value={value} label="Label" onChange={onChangeHandler} />,
		);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should return correct input value', () => {
		const onChangeHandler = jest.fn();
		const wrapper = shallow(
			<Input name="input" value="value" label="Label" onChange={onChangeHandler} />,
		);
		const mockEvent = {
			currentTarget: {
				value: 'ssss',
			},
		};

		wrapper.find('input').simulate('change', mockEvent);

		expect(onChangeHandler).toBeCalledWith({
			value: 'ssss',
			name: 'input',
			event: mockEvent,
		});
	});

	it('should show password input value', () => {
		const onChangeHandler = jest.fn();
		const wrapper = shallow(
			<Input name="input" value="value" label="Label" type="password" onChange={onChangeHandler} />,
		);

		wrapper.find('button').simulate('click');

		expect(wrapper.html()).toMatchSnapshot();
	});
});
