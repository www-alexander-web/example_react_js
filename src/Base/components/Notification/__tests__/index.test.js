// @flow

// TODO: TDD
import React from 'react';
import {
	shallow,
} from 'enzyme';

import Notification from '..';

describe('The Notification component', () => {
	it('should renders correctly type=success', () => {
		const wrapper = shallow(<Notification
			message="test"
			type="success"
			isUpdate={false}
			onGettingNotification={() => {}}
		/>);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should renders correctly type=error', () => {
		const wrapper = shallow(<Notification
			message="test"
			type="error"
			isUpdate={false}
			onGettingNotification={() => {}}
		/>);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should renders correctly type=normal', () => {
		const wrapper = shallow(<Notification
			message="test"
			type="normal"
			isUpdate={false}
			onGettingNotification={() => {}}
		/>);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
