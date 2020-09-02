// @flow

// TODO: TDD

import React from 'react';
import {
	shallow,
} from 'enzyme';
import {
	MemoryRouter,
} from 'react-router-dom';
import {
	Provider,
} from 'react-redux';

import storeMock from '@base/store/storeMock';

import {
	MainLayout,
} from '..';

describe('The MainLayout component', () => {
	it('renders correctly', () => {
		const wrapper = shallow(
			<Provider store={storeMock}>
				<MemoryRouter>
					<MainLayout
						menuLinks={[]}
						modulesLinks={[]}
						location=""
						message=""
						type="normal"
						onUseNavigation={() => [
							[],
							'',
						]}
						isUpdate={false}
						onGettingNotification={() => {}}
						checkToken={() => {}}
					>
						Hello world
					</MainLayout>
				</MemoryRouter>
			</Provider>,
		);

		expect(wrapper.exists()).toBeTruthy();
		expect(wrapper.html()).toMatchSnapshot();
	});
});
