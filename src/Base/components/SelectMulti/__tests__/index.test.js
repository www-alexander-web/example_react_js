// @flow

import React from 'react';
import {
	shallow,
} from 'enzyme';

import {
	SelectMulti,
} from '@base/components';

const options = [
	{
		value: 'test1',
		label: 'Test',
	},
	{
		value: 'test2',
		label: 'Info',
	},
	{
		value: 'test3',
		label: 'Address',
	},
];

describe('The SelectMulti component', () => {
	it('should renders correctly', () => {
		const wrapper = shallow(
			<SelectMulti
				name="select"
				title="title"
				options={options}
				value={[
					'test1',
					'test3',
				]}
				onChange={() => {}}
			/>,
		);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
