// @flow

import modulesRoutes from '@base/constants/routesModules';

const getMonitoringRoutes = (baseURL: string) => {
	const url = baseURL !== '' ? `${baseURL}/` : '/';
	return ({
		root: `${url}`,
		title: 'Monitoring',
		account: {
			root: `${url}account`,
			title: 'Accounts',
			icon: 'icon-account',
		},
	});
};

const monitoringRoutes = getMonitoringRoutes(modulesRoutes.monitoring.root);

export default monitoringRoutes;
