// @flow

import React,
{
	useState,
} from 'react';
import {
	storiesOf,
} from '@storybook/react';
import {
	action,
} from '@storybook/addon-actions';

import Pagination from '.';

const mockOnClick = action('Click Page');

storiesOf('Basic', module).add('Pagination', () => {
	const [
		value,
		setValue,
	] = useState(0);
	return (
		<div style={{
			margin: '10',
		}}
		>
			<h5>Pagination component default</h5>
			<Pagination
				pageSize={10}
				count={20}
				page={value}
				name="pagination-test"
				onChange={(obj) => {
					mockOnClick(obj);
					setValue(obj.value);
				}}
				isLoading={false}
			/>
		</div>
	);
});
