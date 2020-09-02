// @flow

import React from 'react';
import {
	storiesOf,
} from '@storybook/react';
import {
	action,
} from '@storybook/addon-actions';

import {
	Input,
} from '@base/components';

const actionInputChange = action('Input action');

const wrapper = {
	margin: '3rem 0 1rem',
};

const header = {
	marginBottom: '2rem',
	display: 'block',
	fontSize: 15,
};

storiesOf('Basic', module).add('Input', () => (
	<div style={{ margin: 10, maxWidth: 300 }}>
		<h5 style={{ margin: '20px 0', fontWeight: 600, fontSize: 20 }}>
			Input component
		</h5>
		<div style={wrapper}>
			<h5 style={header}>Type text</h5>
			<Input
				label="Login"
				name="test-input"
				value=""
				onChange={actionInputChange}
			/>
		</div>
		<div style={wrapper}>
			<h5 style={header}>Type password</h5>
			<Input
				label="Password"
				name="test-input2"
				value=""
				type="password"
				onChange={actionInputChange}
			/>
		</div>
		<div style={wrapper}>
			<h5 style={header}>Input required</h5>
			<Input
				label="Required"
				required
				name="test-input3"
				value=""
				onChange={actionInputChange}
			/>
		</div>
		<div style={wrapper}>
			<h5 style={header}>Without label</h5>
			<Input
				name="test-input4"
				value=""
				onChange={actionInputChange}
			/>
		</div>
		<div style={wrapper}>
			<h5 style={header}>Field with error</h5>
			<Input
				name="test-input5"
				value=""
				onChange={actionInputChange}
				error="Error message"
			/>
		</div>
		<div style={wrapper}>
			<h5 style={header}>Disabled number input</h5>
			<Input
				name="test-input6"
				type="integer"
				disabled
				value=""
				onChange={actionInputChange}
			/>
		</div>
		<div style={wrapper}>
			<h5 style={header}>Small input</h5>
			<Input
				name="test-input6"
				size="small"
				type="integer"
				label="Label"
				required
				value=""
				error="This field is required. This field is required."
				onChange={actionInputChange}
			/>
		</div>
	</div>
));
