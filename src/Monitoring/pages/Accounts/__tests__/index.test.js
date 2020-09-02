// @flow

// TODO: TDD

import React from 'react';
import {
	shallow,
} from 'enzyme';
import {
	Provider,
} from 'react-redux';
import {
	MemoryRouter,
} from 'react-router-dom';

import {
	Accounts,
} from '@mg/pages/Accounts';
import storeMock from '@mg/store/storeMock';
import mgRoutes from '@mg/constants/routes';


describe('The MG component', () => {
	it('renders correctly', () => {
		const wrapper = shallow(
			<Provider store={storeMock}>
				<MemoryRouter initialEntries={[
					mgRoutes.account.root,
				]}
				>
					<Accounts />
				</MemoryRouter>
			</Provider>,
		);
		expect(wrapper.isEmptyRender()).not.toBeTruthy();
		expect(wrapper.html()).toMatchSnapshot();
	});
});
