// @flow

import React from 'react';
import {
	MemoryRouter,
} from 'react-router-dom';
import {
	storiesOf,
} from '@storybook/react';

import {
	Tabs,
} from '@base/components';

const paths = [
	{
		path: '/test',
		label: 'test',
	},
	{
		path: '/home',
		label: 'Home',
	},
	{
		path: '/auth',
		label: 'Auth',
	},
];

storiesOf('Basic', module).add('Tabs', () => (
	<div style={{
		margin: 10,
	}}
	>
		<h4>Tabs component:</h4>
		<h5>Type navigate:</h5>
		<div style={{
			margin: '10px 0',
		}}
		>
			<MemoryRouter initialEntries={[
				'/test',
			]}
			>
				<Tabs
					paths={paths}
				/>
			</MemoryRouter>
		</div>
		<h5>Type select:</h5>
		<div style={{
			margin: '10px 0',
		}}
		>
			<MemoryRouter initialEntries={[
				'/home',
			]}
			>
				<Tabs
					paths={paths}
					type="select"
				/>
			</MemoryRouter>
		</div>
	</div>
));
