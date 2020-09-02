// @flow

import React from 'react';
import {
	storiesOf,
} from '@storybook/react';
import {
	action,
} from '@storybook/addon-actions';

import ChartOptionsInputs from '@base/components/ChartOptionsInputs';

import mockData from './mockData';

const actionInputChange = action('Input action');

storiesOf('Profiles page', module).add('ChartOptionsInputs', () => (
	<div>
		<h5>ProfileInputs component</h5>
		<div
			style={{
				padding: 20,
				maxWidth: 700,
			}}
		>
			<ChartOptionsInputs
				values={mockData.values}
				touched={mockData.touched}
				errors={mockData.errors}
				handleChange={actionInputChange}
				handleBlur={() => {}}
			/>
		</div>
	</div>
));
