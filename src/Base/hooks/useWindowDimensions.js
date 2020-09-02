// @flow
import {
	useState,
	useEffect,
} from 'react';
import {
	useDebouncedCallback,
} from 'use-debounce';

const getWindowDimensions = (): {width: number, height: number} => {
	const {
		outerWidth: width, outerHeight: height,
	} = window;
	return {
		width,
		height,
	};
};

const useWindowDimensions = () => {
	const [
		windowDimensions,
		setWindowDimensions,
	] = useState(getWindowDimensions());
	const [
		handleResize,
	] = useDebouncedCallback(
		() => {
			setWindowDimensions(getWindowDimensions());
		},
		500,
	);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [
		handleResize,
	]);

	return windowDimensions;
};

export default useWindowDimensions;
