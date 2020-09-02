// @flow
import type {
	TypeJSON,
} from '@base/types';

export const getTabPaths = <T: {[key: string]: {[key: string]: TypeJSON} | string}>(routes: T) => {
	const tabPaths = [];
	Object.keys(routes).forEach((key) => {
		let label: string = '';
		if (routes[key] && routes[key].root !== undefined) {
			if (routes[key].title !== undefined) {
				label = String(routes[key].title);
			}
			const path = String(routes[key].root);
			tabPaths.push({
				label,
				path,
			});
		}
	});

	return tabPaths;
};

export const getMenuPaths = <T: {[key: string]: {[key: string]: TypeJSON} | string}>(routes: T) => {
	const menuPaths = [];
	Object.keys(routes).forEach((key) => {
		let label: string = '';
		let icon: string = 'icon-calendar';
		if (routes[key] && routes[key].root !== undefined) {
			if (routes[key].title !== undefined) {
				label = String(routes[key].title);
			}
			if (routes[key].icon !== undefined) {
				icon = String(routes[key].icon);
			}
			const path = String(routes[key].root);
			menuPaths.push({
				label,
				path,
				icon,
			});
		}
	});

	return menuPaths;
};

export default null;
