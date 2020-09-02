// @flow

// TODO: TDD

import {
	shallow,
} from 'enzyme';
import React from 'react';

import {
	App,
} from '..';

const component = <App setMeta={() => {}} />;

describe('The App component', () => {
	it('renders without crashing', () => {
		const wrapper = shallow(component);
		expect(wrapper.exists()).toEqual(true);
	});
});
