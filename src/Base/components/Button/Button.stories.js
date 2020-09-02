// @flow

import React from 'react';
import {
	storiesOf,
} from '@storybook/react';
import {
	action,
} from '@storybook/addon-actions';

import {
	Button,
} from '@base/components';

const mockOnClick = action();

storiesOf('Basic', module).add('Button', () => (
	<div style={{
		margin: '10px',
	}}
	>
		<h5>Buttons</h5>
		<p style={{
			margin: '10px 0px',
		}}
		>
			<Button onClick={mockOnClick}>Default</Button>
			{' '}
			<Button onClick={mockOnClick} theme="primary">Primary</Button>
			{' '}
			<Button onClick={mockOnClick} theme="secondary">Secondary</Button>
			{' '}
			<Button onClick={mockOnClick} theme="secondary" disabled>Disabled</Button>
			{' '}
			<Button onClick={mockOnClick} theme="download">Download</Button>
		</p>
		<p style={{
			margin: '10px 0px',
		}}
		>
			<Button onClick={mockOnClick} fluid>Fluid</Button>
		</p>
		<h5>Flex buttons</h5>
		<div style={{
			display: 'flex',
			margin: '10px 0px',
		}}
		>
			<Button onClick={mockOnClick} fluid>Flex button one</Button>
			<Button onClick={mockOnClick} fluid>Flex button two</Button>
		</div>
		<h5>Buttons with icons</h5>
		<div style={{
			margin: '10px 0px',
		}}
		>
			<Button theme="primary" onClick={mockOnClick}>
				<i className="icon-download" />
				Button
			</Button>
		</div>
		<h5>Buttons icons</h5>
		<div style={{
			margin: '10px 0px',
		}}
		>
			<Button theme="icon" onClick={mockOnClick}>
				<i className="icon-download" />
			</Button>
		</div>
	</div>
));
