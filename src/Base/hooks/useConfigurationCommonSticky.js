// @flow

import {
	useEffect,
	useState,
} from 'react';

export default (ref: { current: HTMLDivElement | null}, stickyTrigger: number = 95) => {
	const [
		sticky,
		setSticky,
	] = useState<boolean>(false);

	useEffect(() => {
		if (ref.current !== null) {
			const mainRect = ref.current.getBoundingClientRect();
			if (window.innerHeight - mainRect.bottom >= stickyTrigger) {
				setSticky(true);
			}
		}
	}, [
		ref,
		stickyTrigger,
	]);

	const handleScroll = () => {
		if (ref.current !== null) {
			const mainRect = ref.current.getBoundingClientRect();
			const spaceAfterMain = window.innerHeight - mainRect.bottom;
			if (spaceAfterMain >= stickyTrigger && !sticky) {
				setSticky(true);
			} else if (spaceAfterMain < stickyTrigger && sticky) {
				setSticky(false);
			}
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	return sticky;
};
