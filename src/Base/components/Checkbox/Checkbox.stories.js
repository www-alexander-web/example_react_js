// @flow

import React from 'react';
import {
	storiesOf,
} from '@storybook/react';
import {
	action,
} from '@storybook/addon-actions';

import {
	Checkbox,
} from '@base/components';

const mockHandler = action('onChangeHandler');

storiesOf('Basic', module).add('Checkbox', () => (
	<div style={{
		margin: 10,
	}}
	>
		<h5>Checkbox component</h5>
		<div style={{
			margin: '10px 0',
		}}
		>
			<Checkbox
				label="Checkbox label"
				name="checkbox-1"
				value={false}
				onChange={mockHandler}
			/>
		</div>
		<div style={{
			margin: '10px 0',
		}}
		>
			<Checkbox
				label="Checkbox label"
				name="checkbox-2"
				value
				onChange={mockHandler}
			/>
		</div>
		<div style={{
			margin: '10px 0',
		}}
		>
			<Checkbox
				label="Checkbox secondary theme"
				name="checkbox-3"
				value
				onChange={mockHandler}
				theme="secondary"
			/>
		</div>
		<div style={{
			margin: '10px 0',
		}}
		>
			<Checkbox
				label="Checkbox secondary theme"
				name="checkbox-4"
				value={false}
				onChange={mockHandler}
				theme="secondary"
			/>
		</div>
	</div>
));
