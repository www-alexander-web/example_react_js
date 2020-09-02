// @flow

import React from 'react';
import {
	BrowserRouter,
} from 'react-router-dom';
import {
	storiesOf,
} from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import {
	Text,
	Link,
} from '@base/components';

storiesOf('Basic', module).add('Link', () => (
	<div style={{
		margin: 10,
	}}
	>
		<h5>Link component</h5>
		<div style={{
			margin: '10px 0',
		}}
		>
			<Link to="https://google.com">External link</Link>
		</div>
		<div style={{
			margin: '10px 0',
		}}
		>
			<BrowserRouter>
				<Link to="/home">Internal link</Link>
			</BrowserRouter>
		</div>
		<div style={{
			margin: '10px 0',
		}}
		>
			<Link to="https://google.com" underlined>Forgot password?</Link>
		</div>
		<div style={{
			margin: '10px 0',
		}}
		>
			<Link to="https://google.com" underlined>
				<Text color="gray">Forgot </Text>
				password?
			</Link>
		</div>
		<div style={{
			margin: '10px 0',
		}}
		>
			<Text color="gray">Back to </Text>
			<Link to="https://google.com">......com</Link>
		</div>
		<div style={{
			margin: '10px 0',
		}}
		>
			<Link to="https://google.com">Resend</Link>
			<Text color="black"> Confirmation Code (after 60 sec).</Text>
		</div>
	</div>
));
