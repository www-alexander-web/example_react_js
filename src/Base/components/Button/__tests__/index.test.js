// @flow

import React from 'react';
import {
	shallow,
} from 'enzyme';

import Button from '..';

describe('The Button component', () => {
	it('should renders correctly', () => {
		const wrapper = shallow(<Button onClick={() => {}}>Button</Button>);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should run onClick handler', () => {
		const onClickMock = jest.fn();
		const wrapper = shallow(<Button onClick={onClickMock}>Button</Button>);
		wrapper.find('button').simulate('click');

		expect(onClickMock).toBeCalled();
	});
});
