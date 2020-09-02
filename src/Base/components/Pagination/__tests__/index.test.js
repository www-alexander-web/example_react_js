// @flow

import React from 'react';
import {
	shallow,
} from 'enzyme';

import Pagination from '..';

describe('The Pagination component', () => {
	it('Default should renders correctly', () => {
		const onClickMock = jest.fn();
		const wrapper = shallow(
			<Pagination
				pageSize={10}
				count={20}
				page={0}
				name="pagination-test"
				onChange={onClickMock}
				isLoading={false}
			/>,
		);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should run onClick handler', () => {
		const onClickMock = jest.fn();
		const wrapper = shallow(
			<Pagination
				pageSize={10}
				count={40}
				page={0}
				name="pagination-test"
				onChange={onClickMock}
				isLoading={false}
			/>,
		);
		wrapper.find('button').first().simulate('click');

		expect(onClickMock).toBeCalled();
	});

	it('should return correct onChange value', () => {
		const onChangeHandler = jest.fn();
		const wrapper = shallow(
			<Pagination
				pageSize={10}
				count={40}
				page={0}
				name="pagination-test"
				onChange={onChangeHandler}
				isLoading={false}
			/>,
		);
		const mockEvent = undefined;

		wrapper.find('button').first().simulate('click');

		expect(onChangeHandler).toBeCalledWith({
			value: 0,
			name: 'pagination-test',
			event: mockEvent,
		});
	});
});
