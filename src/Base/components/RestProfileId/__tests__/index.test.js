// @flow

import React from 'react';
import { shallow } from 'enzyme';
import {
	Provider,
} from 'react-redux';

import RestProfileId from '@base/components/RestProfileId';
import storeMock from '@base/store/storeMock';


describe('The RestProfileId component', () => {
	it('should renders correctly', () => {
		const wrapper = shallow(
			<Provider store={storeMock}>
				<RestProfileId
					profiles={[]}
					name="test"
				/>
			</Provider>,
		);
		expect(wrapper.isEmptyRender()).not.toEqual(true);
	});
});
