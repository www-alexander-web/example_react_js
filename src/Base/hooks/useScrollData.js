// @flow
import {
	useState,
	useLayoutEffect,
} from 'react';
import {
	useDebouncedCallback,
} from 'use-debounce';

const getWindowDimensions = (value: number) => {
	const {
		pageYOffset: y,
	} = window;
	let direction: '' | 'up' | 'down' = '';
	if (y - value > 0) {
		direction = 'down';
	} else if (y - value < 0) {
		direction = 'up';
	}
	return {
		direction,
		y,
	};
};

const useScrollData = () => {
	const [
		scrollData,
		setScrollData,
	] = useState<{direction: '' | 'up' | 'down', y: number}>(
		{
			direction: '',
			y: window.pageYOffset,
		},
	);

	const [
		handleScroll,
	] = useDebouncedCallback(
		() => {
			const obj = getWindowDimensions(scrollData.y);
			setScrollData(obj);
		},
		200,
	);

	useLayoutEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [
		scrollData,
		handleScroll,
	]);

	return scrollData;
};

export default useScrollData;
