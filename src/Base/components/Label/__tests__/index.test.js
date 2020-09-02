// @flow

import React from 'react';
import {
	shallow,
} from 'enzyme';

import Label from '..';

describe('The Label component', () => {
	it('should renders correctly', () => {
		const wrapper = shallow(<Label value={100} />);

		expect(wrapper.isEmptyRender()).not.toEqual(true);
		expect(wrapper.html()).toMatchSnapshot();
	});
});
