// @flow

// TODO: TDD
import React from 'react';
import {
	shallow,
} from 'enzyme';

import Text from '..';

describe('The Text component', () => {
	it('should renders correctly', () => {
		const wrapper = shallow(<Text>Test text</Text>);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
