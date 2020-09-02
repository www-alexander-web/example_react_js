// @flow

// TODO: TDD

import React from 'react';
import {
	MemoryRouter,
} from 'react-router-dom';
import {
	shallow,
} from 'enzyme';

import Navigation from '..';

describe('The Navigation component', () => {
	it('should renders correctly', () => {
		const wrapper = shallow(
			<MemoryRouter initialEntries={[
				'/settings/lp',
			]}
			>
				<Navigation onUseNavigation={() => [
					[],
					'',
				]}
				/>
			</MemoryRouter>,
		);

		expect(wrapper.isEmptyRender()).not.toEqual(true);
		expect(wrapper.html()).toMatchSnapshot();
	});
});
