// @flow

import * as modalTypes from '@base/store/Modal/constants';

export const modalOpenAction = (payload: React$Node) => {
	window.scrollTo({
		behavior: 'smooth',
	});
	return ({
		type: modalTypes.BASE_MODAL_OPEN,
		payload,
	});
};

export const modalCloseAction = () => ({
	type: modalTypes.BASE_MODAL_CLOSE,
});

export default null;
