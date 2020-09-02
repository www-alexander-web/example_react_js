// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import {
	Tooltip,
	Button,
} from '@base/components';

storiesOf('Basic', module).add('Tooltip', () => (
	<div style={{ margin: 10 }}>
		<Tooltip
			name="Example tooltip"
			target={<Button onClick={() => {}}>Hover me!</Button>}
			content="Hello tooltip content!"
		/>
	</div>
));
