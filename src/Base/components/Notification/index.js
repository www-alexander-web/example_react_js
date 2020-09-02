// @flow

import React, {
	useState,
	useEffect,
	useCallback,
} from 'react';
import cx from 'classnames';

import type {
	TypeNotification,
} from '@base/types';

import styles from './Notification.module.scss';

type NotificationProps = {
	className: string,
	message: string,
	type: TypeNotification,
	isUpdate: boolean,
	onGettingNotification: () => void,
};

const Notification = ({
	className,
	message,
	type,
	isUpdate,
	onGettingNotification,
}: NotificationProps) => {
	const [
		text,
		setText,
	] = useState<string>('');

	const [
		timeoutId,
		setTimeoutId,
	] = useState<?TimeoutID>(null);

	useEffect(() => {
		if (isUpdate) {
			clearTimeout(timeoutId);
			setText(message);
			onGettingNotification();
			const timeout = setTimeout(() => {
				clearTimeout(timeoutId);
				setText('');
			}, 3500);
			setTimeoutId(timeout);
		}
	}, [
		timeoutId,
		message,
		isUpdate,
		onGettingNotification,
	]);

	useEffect(() => () => clearTimeout(timeoutId), [
		timeoutId,
	]);

	const handleOkClick = useCallback(() => {
		clearTimeout(timeoutId);
		setText('');
	}, [
		timeoutId,
	]);

	return (
		<div className={cx(
			styles.notification,
			styles[`notification--them-${type}`],
			className,
		)}
		>
			{text && (
				<div className={styles.notification__item}>
					{text}
					<button
						type="button"
						onClick={handleOkClick}
						className={styles.notification__button}
					>
						Ok
					</button>
				</div>
			)}
		</div>
	);
};

Notification.defaultProps = {
	className: '',
	type: 'normal',
};

export default Notification;
