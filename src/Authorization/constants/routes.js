// @flow

import modulesRoutes from '@base/constants/routesModules';

const getAuthRoutes = (baseURL: string) => {
	const url = baseURL !== '' ? `${baseURL}` : '/';
	return {
		root: `${url}`,
		title: 'Main',
		auth: {
			root: `${url}auth`,
			title: 'Auth',
			twoStepAuth: {
				root: `${url}auth/2fa`,
				title: 'Two Step Auth',
			},
			login: {
				root: `${url}auth(|/|/login)`,
				title: 'Login',
			},
			'project-select': {
				root: `${url}project-select`,
				title: 'Project Select',
				monitoring: {
					root: modulesRoutes.monitoring.root,
					title: 'Monitoring',
					icon: '/images/monitoring.svg',
				},
			},
		},
	};
};

const authRoutes = getAuthRoutes(modulesRoutes.root);

export default authRoutes;
