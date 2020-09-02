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
	Switcher,
} from '@base/components';

const actionSwitcherChange = action('Switcher action');

storiesOf('Basic', module).add('Switcher', () => {
	const [
		value,
		setValue,
	] = useState<boolean>(false);
	return (
		<div style={{
			margin: 10,
		}}
		>
			<h5>Switcher component</h5>
			<Switcher
				name="test-switcher"
				value={value}
				onChange={(event) => {
					setValue(event.value);
					actionSwitcherChange(event);
				}}
			/>
		</div>
	);
});
