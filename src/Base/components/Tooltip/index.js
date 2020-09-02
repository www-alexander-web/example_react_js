// @flow

import React,
{ createElement } from 'react';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';

import styles from './index.module.scss';

type Event = 'click' | '';
type Place = 'top' | 'right' | 'bottom' | 'left';
type Tag = 'div' | 'span';
type Offset = { top?: number, right?: number, bottom?: number, left?: number };

type Props = {
	name: string,
	target: React$Node,
	content: React$Node,
	event?: Event | string,
	tag?: Tag,
	eventOff?: Event | string,
	place?: Place,
	effect?: 'solid' | 'float',
	clickable?: boolean,
	offset?: Offset,
	className?: string,
	delayShow?: number,
	onShow?: () => void,
	onHide?: () => void,
};

const Tooltip = ({
	name,
	target,
	content,
	event = 'mouseenter',
	eventOff = 'mouseleave',
	place = 'bottom',
	effect = 'solid',
	tag = 'span',
	clickable = false,
	offset = {},
	className,
	delayShow = 0,
	onShow = () => {},
	onHide = () => {},
}: Props) => {
	const targetElement = createElement(tag, {
		'data-tip': '',
		'data-for': name,
		'data-event': event,
	}, target);

	return (
		<>
			{targetElement}
			<ReactTooltip
				id={name}
				eventOff={eventOff}
				place={place}
				effect={effect}
				clickable={clickable}
				className={cx(styles.tooltip, className)}
				offset={offset}
				backgroundColor="white"
				textColor="black"
				border
				borderColor="#ced4da"
				afterShow={onShow}
				afterHide={onHide}
				delayShow={delayShow}
			>
				{content}
			</ReactTooltip>
		</>
	);
};

export default Tooltip;
