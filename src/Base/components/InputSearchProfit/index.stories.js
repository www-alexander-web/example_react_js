// @flow

import React,
{
	useState,
} from 'react';
import {
	storiesOf,
} from '@storybook/react';

import InputSearchProfit from '.';

storiesOf('Basic', module).add('InputSearchProfit', () => {
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
		<div
			style={{
				padding: '1rem',
			}}
		>
			<h5
				style={{
					marginBottom: '0.5rem',
				}}
			>
				InputSearchProfit component
			</h5>
			<Parent>
				{(inputValue, setInputValue) => (
					<InputSearchProfit
						inputValue={inputValue}
						name="input"
						onChange={({
							value,
						}) => setInputValue(value)}
						searchAction={(searchType) => {
							// eslint-disable-next-line
							console.log('searchType:', searchType);
						}}
					/>
				)}
			</Parent>
		</div>
	);
});
