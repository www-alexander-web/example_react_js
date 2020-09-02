// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import { Truncate } from '@base/components';

storiesOf('Basic', module).add('Truncate', () => (
	<div style={{ margin: 10 }}>
		<Truncate width={80}>Some long text with overhead words</Truncate>
	</div>
));
