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

import {
	RadioButton,
} from '@base/components';

const actionInputChange = action('Input action');

const options1 = [
	{
		value: 'NONE',
		label: 'None',
	},
	{
		value: 'ONE',
		label: 'One',
	},
];

const options2 = [
	{
		value: 'NONE',
		label: 'None',
	},
	{
		value: 'ONE',
		label: 'One',
	},
	{
		value: 'ALL',
		label: 'All',
	},
];

const options3 = [
	{
		value: 'NONE',
		label: 'None',
	},
	{
		value: 'ONE',
		label: 'One',
		disabled: true,
	},
	{
		value: 'ALL',
		label: 'All',
	},
];

storiesOf('Basic', module).add('RadioButton', () => {
	const [
		value1,
		setValue1,
	] = useState<string>('NONE');
	const [
		value2,
		setValue2,
	] = useState<string>('NONE');
	const [
		value3,
		setValue3,
	] = useState<string>('NONE');
	return (
		<div style={{
			margin: 10,
		}}
		>
			<h5>RadioButton component</h5>
			<div style={{
				margin: '10px 0',
			}}
			>
				<h5>View 1</h5>
				<RadioButton
					name="test-radio-button1"
					value={value1}
					options={options1}
					onChange={(obj) => {
						actionInputChange(obj);
						setValue1(obj.value);
					}}
				/>
			</div>
			<div style={{
				margin: '10px 0',
			}}
			>
				<h5>View 2</h5>
				<RadioButton
					name="test-radio-button2"
					value={value2}
					options={options2}
					onChange={(obj) => {
						actionInputChange(obj);
						setValue2(obj.value);
					}}
				/>
			</div>
			<div style={{
				margin: '10px 0',
			}}
			>
				<h5>View 3</h5>
				<RadioButton
					name="test-radio-button3"
					value={value3}
					options={options3}
					onChange={(obj) => {
						actionInputChange(obj);
						setValue3(obj.value);
					}}
				/>
			</div>
		</div>
	);
});
