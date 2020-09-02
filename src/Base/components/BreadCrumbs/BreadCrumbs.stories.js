// @flow

import React from 'react';
import {
	BrowserRouter,
} from 'react-router-dom';
import {
	storiesOf,
} from '@storybook/react';

import {
	BreadCrumbs,
} from '@base/components';

const paths = [
	{
		path: '/test',
		label: 'Test',
	},
	{
		path: '/test/info',
		label: 'Info',
	},
	{
		path: '/test/info/address',
		label: 'Address',
	},
];

storiesOf('Basic', module).add('Bread Crumbs', () => (
	<div style={{
		margin: 10,
	}}
	>
		<h5>Bread Crumbs</h5>
		<BrowserRouter>
			<BreadCrumbs paths={paths} />
		</BrowserRouter>
	</div>
));
