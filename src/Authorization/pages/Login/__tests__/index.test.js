// @flow

// TODO: TDD

import React from 'react';
import {
	MemoryRouter,
} from 'react-router-dom';
import {
	Provider,
} from 'react-redux';
import {
	shallow,
} from 'enzyme';

import storeMock from '@mg/store/storeMock';

import {
	Login,
} from '../index';

describe('The Login component', () => {
	it('renders correctly', () => {
		const wrapper = shallow(
			<Provider store={storeMock}>
				<MemoryRouter>
					<Login />
				</MemoryRouter>
			</Provider>,
		);

		expect(wrapper.exists(Login)).toBeTruthy();
		expect(wrapper.html()).toMatchSnapshot();
	});
});
