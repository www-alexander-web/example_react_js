// @flow

import React from 'react';
import {
	shallow,
} from 'enzyme';

import SearchButton from '@base/components/SearchButton';

describe('The SearchButton component', () => {
	it('should renders correctly', () => {
		const wrapper = shallow(<SearchButton onClick={() => {}} />);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
