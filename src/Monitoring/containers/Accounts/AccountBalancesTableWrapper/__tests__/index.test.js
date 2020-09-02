// @flow

// TODO: TDD

import React from 'react';
import {
	shallow,
} from 'enzyme';
import {
	Provider,
} from 'react-redux';

import AccountBalancesTableWrapper
	from '@mg/containers/Accounts/AccountBalancesTableWrapper/AccountBalancesTableWrapper';
import storeMock from '@mg/store/storeMock';


describe('The AccountBalancesTableWrapper component', () => {
	it('expect renders correctly', () => {
		const wrapper = shallow(
			<Provider store={storeMock}>
				<AccountBalancesTableWrapper />
			</Provider>,
		);
		expect(wrapper.isEmptyRender()).not.toEqual(true);
		expect(wrapper.html()).toMatchSnapshot();
	});
});
