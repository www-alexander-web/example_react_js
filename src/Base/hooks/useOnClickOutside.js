// @flow
// flowlint sketchy-null-mixed:off

import {
	useEffect,
} from 'react';

export default (ref: { current: HTMLDivElement | null}, handler: () => void) => {
	useEffect(
		() => {
			const listener = (event: Event) => {
				if (!ref.current || (event.target instanceof Node && ref.current && ref.current.contains(event.target))) {
					return;
				}

				handler();
			};

			document.addEventListener('mousedown', listener);
			document.addEventListener('touchstart', listener);

			return () => {
				document.removeEventListener('mousedown', listener);
				document.removeEventListener('touchstart', listener);
			};
		},
		[
			ref,
			handler,
		],
	);
};
