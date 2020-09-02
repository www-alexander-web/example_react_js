// @flow
import {
	useRef,
	useEffect,
} from 'react';

const usePrevious = <T>(value: T): T | void => {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
};

export default usePrevious;
