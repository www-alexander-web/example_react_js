// @flow

import React from 'react';
import {
	storiesOf,
} from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import {
	Notification,
} from '@base/components';

storiesOf('Basic', module).add('Notification', () => (
	<div>
		<h5>Notification component</h5>
		<Notification
			message="test"
			type="success"
			isUpdate={false}
			onGettingNotification={() => {}}
		/>
	</div>
));
