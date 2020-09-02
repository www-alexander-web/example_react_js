// @flow

import React from 'react';
import {
	storiesOf,
} from '@storybook/react';

// import { action } from '@storybook/addon-actions';
import {
	Text,
} from '@base/components';

storiesOf('Basic', module).add('Text', () => (
	<div style={{
		margin: 10,
	}}
	>
		<h5>Text component</h5>
		<Text type="h1">Header 1</Text>
		<Text type="h2">Header 2</Text>
		<Text type="h3">Header 3</Text>
		<Text type="h4">Header 4</Text>
		<Text type="h5">Header 5</Text>
		<Text type="h6">Header 6</Text>
		<Text>Regular text</Text>
	</div>
));
