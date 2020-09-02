// @flow

import React from 'react';
import {
	Provider,
} from 'react-redux';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import RestProfileId from '@base/components/RestProfileId';
import storeMock from '@base/store/storeMock';
import type { AccountsProfilesItem } from '@base/types/grups';

const PROFILES_3: AccountsProfilesItem[] = [
	{
		id: 1,
		name: 'profile name 1',
		bot: 'bot 1',
	},
	{
		id: 2,
		name: 'profile name 2',
		bot: 'bot 2',
	},
	{
		id: 3,
		name: 'profile name 3',
		bot: 'bot 3',
	},
];

const PROFILES_6: AccountsProfilesItem[] = [
	{
		id: 1,
		name: 'profile name 1',
		bot: 'bot 1',
	},
	{
		id: 2,
		name: 'profile name 2',
		bot: 'bot 2',
	},
	{
		id: 3,
		name: 'profile name 3',
		bot: 'bot 3',
	},
	{
		id: 4,
		name: 'profile name 4',
		bot: 'bot 4',
	},
	{
		id: 5,
		name: 'profile name 5',
		bot: 'bot 5',
	},
	{
		id: 6,
		name: 'profile name 6',
		bot: 'bot 6',
	},
];

const wrapper = {
	marginBottom: '2rem',
	fontSize: 12,
};

const header = {
	fontSize: 14,
	marginBottom: '1rem',
};

storiesOf('Basic', module).add('RestProfileId', () => (
	<Provider store={storeMock}>
		<div style={{
			margin: 10,
		}}
		>
			<div style={wrapper}>
				<h5 style={header}>RestProfileId, 6 items</h5>
				<RestProfileId
					profiles={PROFILES_6}
					name="test-1"
				/>
			</div>
			<div style={wrapper}>
				<h5 style={header}>RestProfileId, 3 items</h5>
				<RestProfileId
					profiles={PROFILES_3}
					name="test-2"
				/>
			</div>
		</div>
	</Provider>
));
