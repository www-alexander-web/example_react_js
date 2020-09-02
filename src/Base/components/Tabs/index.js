// @flow

import React, {
	useState,
	useEffect,
} from 'react';
import cx from 'classnames';
import {
	NavLink,
} from 'react-router-dom';

import style from './Tabs.module.scss';

type TabsPaths = {
	path: string,
	label: string
}

type Props = {
	paths: Array<TabsPaths>,
	type: 'navigate' | 'select',
	className?: string,
};

const Tabs = ({
	type,
	paths,
	className,
}: Props) => {
	const [
		isOpen,
		setIsOpen,
	] = useState<boolean>(false);
	const [
		activeLabel,
		setActiveLabel,
	] = useState<string>('');

	useEffect(() => {
		setIsOpen(false);
	}, [
		activeLabel,
	]);

	let nowIndex = 0;

	if (type === 'select') {
		return (
			<nav
				className={cx(
					style.tabs,
					style['tabs--select'],
					[
						style[`tabs--theme--${type}`],
					],
					className,
				)}
			>
				<button
					type="button"
					className={style.tabs__button}
					onClick={() => { setIsOpen(!isOpen); }}
				>
					<div className={style['tabs__button-icon']}>
						<i className="icon-down-open" />
					</div>
					<span className={style['tabs__link-text']}>
						{activeLabel}
					</span>
					<div className={style.tabs__border} />
				</button>
				<ul
					className={cx(
						style.tabs__box,
						{
							[style['tabs__box--open']]: isOpen,
						},
					)}
				>
					{paths.map(({
						path, label,
					}) => {
						nowIndex += 1;
						return (
							<li
								key={nowIndex}
								className={style.tabs__item}
							>
								<NavLink
									activeClassName={style['tabs__link--active']}
									className={style.tabs__link}
									to={path}

									isActive={(match) => {
										if (match) {
											setActiveLabel(label);
											return true;
										}
										return false;
									}}
								>
									<span className={style['tabs__link-text']}>
										{label}
									</span>
									<div className={style.tabs__border} />
								</NavLink>
							</li>
						);
					})}
				</ul>
			</nav>
		);
	}
	return (
		<nav
			className={cx(
				style.tabs,
				[
					style[`tabs--theme--${type}`],
				],
				className,
			)}
		>
			<ul className={style.tabs__box}>
				{paths.map(({
					path, label,
				}) => (
					<li
						key={path}
						className={style.tabs__item}
					>
						<NavLink
							activeClassName={style['tabs__link--active']}
							className={style.tabs__link}
							to={path}
						>
							{label}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};

Tabs.defaultProps = {
	type: 'navigate',
};

export default Tabs;
