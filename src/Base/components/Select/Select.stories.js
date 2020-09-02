// flow

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
	Select,
} from '@base/components';

const actionSelectChange = action('Select action');

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

const optionsSecond = [
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
		disabled: true,
	},
	{
		value: 'test4',
		label: 'Test4',
	},
	{
		value: 'test5',
		label: 'Test5',
	},
	{
		value: 'test6',
		label: 'Test6',
	},
	{
		value: 'test7',
		label: 'Test7',
	},
	{
		value: 'test8',
		label: 'Test8',
	},
	{
		value: 'test9',
		label: 'Test9',
		disabled: true,
	},
	{
		value: 'test10',
		label: 'Test10',
	},
];

storiesOf('Basic', module).add('Select', () => {
	const [
		value,
		setValue,
	] = useState('test10');
	return (
		<div style={{
			margin: 10,
		}}
		>
			<h5>Select</h5>
			<div style={{
				margin: 10,
				width: 250,
			}}
			>
				<h5>Select with full logic</h5>
				<Select
					name="test"
					options={optionsSecond}
					value={value}
					onChange={(obj) => {
						actionSelectChange(obj);
						setValue(obj.value);
					}}
				/>
			</div>
			<div style={{
				margin: 10,
				width: 250,
			}}
			>
				<h5>Select default</h5>
				<Select options={[]} value="" name="test2" onChange={() => {}} />
			</div>
			<div style={{
				margin: 10,
				width: 250,
			}}
			>
				<h5>Select disabled</h5>
				<Select options={[]} value="" name="test2" onChange={() => {}} disabled />
			</div>
			<div style={{
				margin: 10,
				width: 250,
			}}
			>
				<h5>Select base:</h5>
				<Select options={options} value="test1" />
			</div>
		</div>
	);
});
