// @flow

import React from 'react';
import {
	storiesOf,
} from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import {
	Label,
} from '@base/components';

storiesOf('Basic', module).add('Label', () => (
	<div>
		<h5>Label component</h5>

		<div style={{
			margin: 10,
		}}
		>
			<Label type="success" value="1000" />
			<Label type="warning" value="1000" />
			<Label type="error" value="1000" />
		</div>

	</div>
));
