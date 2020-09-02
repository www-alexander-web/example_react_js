// @flow

// TODO: TDD

import React from 'react';
import {
	shallow,
} from 'enzyme';
import {
	Provider,
} from 'react-redux';

import AccountProfilesTableWrapper from '@mg/containers/Accounts/AccountProfilesTableWrapper/AccountProfilesTableWrapper';
import storeMock from '@mg/store/storeMock';


describe('The AccountProfilesTableWrapper component', () => {
	it('expect renders correctly', () => {
		const wrapper = shallow(
			<Provider store={storeMock}>
				<AccountProfilesTableWrapper />
			</Provider>,
		);
		expect(wrapper.isEmptyRender()).not.toEqual(true);
		expect(wrapper.html()).toMatchSnapshot();
	});
});
