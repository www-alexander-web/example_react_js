// @flow

// TODO: TDD

import React from 'react';
import {
	Provider,
} from 'react-redux';
import {
	MemoryRouter,
} from 'react-router-dom';
import {
	shallow,
} from 'enzyme';

import storeMock from '@mg/store/storeMock';

import {
	TwoStepAuth,
} from '../index';

describe('The TwoStepAuth component', () => {
	it('renders correctly', () => {
		const wrapper = shallow(
			<Provider store={storeMock}>
				<MemoryRouter>
					<TwoStepAuth />
				</MemoryRouter>
			</Provider>,
		);

		expect(wrapper.exists()).toBeTruthy();
		expect(wrapper.html()).toMatchSnapshot();
	});
});
