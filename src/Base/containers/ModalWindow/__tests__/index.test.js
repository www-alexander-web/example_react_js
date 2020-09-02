// @flow

import React from 'react';
import {
	shallow,
} from 'enzyme';

import {
	ModalWindow,
} from '@base/containers/ModalWindow';

describe('The ModalWindow component', () => {
	it('should renders correctly', () => {
		const onModalClose = jest.fn();
		const wrapper = shallow(
			<ModalWindow
				pathname=""
				modalComponent={null}
				isOpen={false}
				onModalClose={onModalClose}
			/>,
		);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
