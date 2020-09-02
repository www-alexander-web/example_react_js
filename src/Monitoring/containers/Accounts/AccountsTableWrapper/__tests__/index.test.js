// @flow

// TODO: TDD

import React from 'react';
import {
	Provider,
} from 'react-redux';
import {
	shallow,
} from 'enzyme';

import storeMock from '@mg/store/storeMock';
import {
	AccountsTableWrapper,
}
	from '@mg/containers/Accounts/AccountsTableWrapper/AccountsTableWrapper';


describe('The AccountsTableWrapper component', () => {
	it('expect renders correctly', () => {
		const onAccountsGet = jest.fn();
		const wrapper = shallow(
			<Provider store={storeMock}>
				<AccountsTableWrapper
					data={[]}
					isLoading={false}
					onAccountsGet={onAccountsGet}
					onAccountBalancesGet={onAccountsGet}
					onAccountProfilesGet={onAccountsGet}
				/>
				,
			</Provider>,
		);
		expect(wrapper.isEmptyRender())
			.not
			.toEqual(true);
		expect(wrapper.html())
			.toMatchSnapshot();
	});
});
