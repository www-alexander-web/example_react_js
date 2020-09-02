// @flow

import React from 'react';
import {
	storiesOf,
} from '@storybook/react';
// import { action } from '@storybook/addon-actions';

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

storiesOf('Basic', module).add('SelectMulti', () => (
	<div
		style={{
			maxWidth: 300,
			padding: 20,
		}}
	>
		<h5
			style={{
				marginBottom: 10,
			}}
		>
			SelectMulti component
		</h5>
		<SelectMulti
			name="select"
			title="Title"
			options={options}
			value={[
				'test1',
				'test3',
			]}
			onChange={() => {}}
		/>
		<h5
			style={{
				margin: '20px 0 10px',
			}}
		>
			SelectMulti component with error
		</h5>
		<SelectMulti
			name="select"
			title="Title"
			options={options}
			value={[
				'test1',
				'test3',
			]}
			onChange={() => {}}
			error="Error message"
		/>

		<h5
			style={{
				margin: '20px 0 10px',
			}}
		>
			SelectMulti component with required
		</h5>
		<SelectMulti
			name="select"
			title="Title"
			required
			options={options}
			value={[
				'test1',
				'test3',
			]}
			onChange={() => {}}
		/>
	</div>
));
