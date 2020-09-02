// @flow

import React from 'react';
import {
	storiesOf,
} from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import SearchButton from '@base/components/SearchButton';

storiesOf('Basic', module).add('SearchButton', () => (
	<div>
		<h5>SearchButton component</h5>
		<SearchButton onClick={() => {}} />
	</div>
));
