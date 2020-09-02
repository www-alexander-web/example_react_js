// @flow

import React,
{
	useState,
} from 'react';
import {
	storiesOf,
} from '@storybook/react';
import {
	action,
} from '@storybook/addon-actions';

import {
	InputSearch,
} from '@base/components';

const actionClickChange = action('Click action');

storiesOf('UI', module).add('InputSearch', () => {
	function Parent({
		// eslint-disable-next-line
		children,
	}) {
		const [
			inputValue,
			setInputValue,
		] = useState<string>('');
		return <div>{children(inputValue, setInputValue)}</div>;
	}

	return (
		<div style={{
			margin: 10,
		}}
		>
			<h5>InputSearch component</h5>
			<div style={{
				margin: '10px 0',
			}}
			>
				<Parent>
					{(inputValue, setInputValue) => (
						<InputSearch
							name="test-input-search"
							value={inputValue}
							placeholder="Search..."
							onChange={({
								value,
							}) => setInputValue(String(value))}
							onClick={actionClickChange}
						/>
					)}
				</Parent>
			</div>
		</div>
	);
});
