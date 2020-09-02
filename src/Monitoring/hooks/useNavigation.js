// @flow

import React from 'react';
import {
	useLocation,
} from 'react-router-dom';

import type {
	BreadCrumbsPaths,
} from '@base/components/BreadCrumbs';

import monitoringRoutes from '@mg/constants/routes';


const useNavigation = () => {
	const {
		pathname,
	} = useLocation();
	const baseUrl = monitoringRoutes.root.replace(/\//g, '');

	return React.useMemo<[Array<BreadCrumbsPaths>, string]>(() => {
		const pathParts = pathname.split('/')
			.slice(1)
			.filter((path) => path);
		let title: string = '';
		let crumbsPaths = [];

		pathParts.reduce((acc, part) => {
			const {
				routes,
			} = acc;
			const newRoutes = routes[part];

			if (baseUrl === part) {
				crumbsPaths = [];
				crumbsPaths.push({
					path: monitoringRoutes.root,
					label: monitoringRoutes.title,
				});
				return {
					path: monitoringRoutes.root,
					routes: monitoringRoutes,
				};
			}

			if (newRoutes === undefined) {
				title = '';
				crumbsPaths = [];
				return {
					path: '/',
					routes: {},
				};
			}

			crumbsPaths.push({
				path: newRoutes.root,
				label: newRoutes.title,
			});

			title = newRoutes.title;

			return {
				path: newRoutes.root,
				routes: newRoutes,
			};
		}, {
			path: '/',
			routes: monitoringRoutes,
		});

		return [
			crumbsPaths,
			title,
		];
	}, [
		pathname,
		baseUrl,
	]);
};

export default useNavigation;
