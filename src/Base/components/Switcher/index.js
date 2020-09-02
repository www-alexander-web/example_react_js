// @flow

import React,
{
	useCallback,
} from 'react';
import cx from 'classnames';

import styles from './Switcher.module.scss';

type SwitcherProps = {
	name: string,
	value: boolean,
	onChange: ({
		name: string,
		value: boolean,
		event: SyntheticInputEvent<HTMLInputElement>
	}) => void,
	className: string,
};

const Switcher = ({
	className,
	name,
	value,
	onChange,
}: SwitcherProps) => {
	const handleSwitcherChange = useCallback((event: SyntheticInputEvent<HTMLInputElement>) => {
		onChange({
			name,
			value: event.currentTarget.checked,
			event,
		});
	}, [
		onChange,
		name,
	]);

	return (
		<div className={cx(
			styles.switcher,
			{
				[styles['switcher--active']]: value,
			},
			className,
		)}
		>
			<label
				htmlFor={name}
			>
				<span
					className={cx(
						styles.switcher__slider,
						{
							[styles['switcher__slider--active']]: value,
						},
					)}
				/>
				{' '}
			</label>
			<input
				id={name}
				name={name}
				type="checkbox"
				className={cx(styles.switcher__input)}
				checked={value}
				onChange={handleSwitcherChange}
			/>
		</div>
	);
};

Switcher.defaultProps = {
	className: '',
};

export default Switcher;
