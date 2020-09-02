// @flow

// TODO: TDD

import React from 'react';
import {
	shallow,
} from 'enzyme';

import {
	UserPanel,
} from '..';

describe('The Header component', () => {
	it('expect renders correctly', () => {
		const logoutHandlerMock = jest.fn();
		const wrapper = shallow(<UserPanel logoutHandler={logoutHandlerMock} />);

		expect(wrapper.isEmptyRender()).not.toEqual(true);
		expect(wrapper.html()).toMatchSnapshot();
	});
});
