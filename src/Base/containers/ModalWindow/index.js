/* eslint-disable jsx-a11y/control-has-associated-label */
// @flow

import React,
{
	useCallback,
	useEffect,
} from 'react';
import {
	connect,
} from 'react-redux';

import type {
	BaseState,
} from '@base/types';
import {
	modalCloseAction,
} from '@base/store/Modal/actions';
import styles from '@base/containers/ModalWindow/ModalWindow.module.scss';

type OwnProps = {||};

type ModalWindowProps = {|
	...OwnProps,
	pathname: string,
	modalComponent: React$Node,
	isOpen: boolean,
	onModalClose: () => void
|};

export const ModalWindow = ({
	modalComponent,
	isOpen,
	pathname,
	onModalClose,
}: ModalWindowProps) => {
	const handleKeyPress = useCallback((event) => {
		if (event.keyCode === 27) {
			onModalClose();
		}
	}, [
		onModalClose,
	]);
	useEffect(() => {
		onModalClose();
	}, [
		pathname,
		onModalClose,
	]);

	if (!isOpen) {
		return (<></>);
	}

	return (
		<div
			className={styles['modal-window']}
			role="button"
			tabIndex={-1}
			onKeyDown={handleKeyPress}
		>
			<div
				className={styles['modal-window__box']}
				onClick={onModalClose}
				role="button"
				tabIndex={-1}
				onKeyDown={handleKeyPress}
			/>
			<div className={styles['modal-window__content']}>
				{modalComponent}
			</div>
		</div>
	);
};

const mapStateToProps = ({
	base,
	router,
}: BaseState) => ({
	pathname: router.location.pathname,
	modalComponent: base.modal.modalComponent,
	isOpen: base.modal.isOpen,
});

const mapDispatchToProps = (dispatch) => ({
	onModalClose: () => dispatch(modalCloseAction()),
});

export default connect<_, OwnProps, _, _, _, _>(
	mapStateToProps,
	mapDispatchToProps,
)(ModalWindow);
