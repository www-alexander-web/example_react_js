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
	MainMenu,
} from '../index';

describe('The MainMenu component', () => {
	const menuLinks = [
		{
			path: '/settings',
			label: 'Settings',
			icon: 'icon-calendar',
		},
		{
			path: '/data',
			label: 'Data & Report',
			icon: 'icon-calendar',
		},
		{
			path: '/search',
			label: 'Search',
			icon: 'icon-icon',
		},
	];

	const modulesLinks = [
		{
			path: '/exchange-arbitrage-bot',
			label: 'Exchange Bot',
			icon: 'icon-exchange-arbitrage',
		},
		{
			path: '/triangular-bot',
			label: 'Triangular Bot',
			icon: 'icon-exclude',
		},
		{
			path: '/user-pool-bot',
			label: 'User Pool Bot',
			icon: 'icon-users',
		},
	];

	it('expect renders correctly', () => {
		const wrapper = shallow(
			<MemoryRouter initialEntries={[
				'/settings',
			]}
			>
				<MainMenu menuLinks={menuLinks} modulesLinks={modulesLinks} />
			</MemoryRouter>,
		);

		expect(wrapper.isEmptyRender()).not.toEqual(true);
		expect(wrapper.html()).toMatchSnapshot();
	});
});
