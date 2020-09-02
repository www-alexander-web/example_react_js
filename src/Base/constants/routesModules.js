// @flow
export const getModulesRoutes = (baseURL: string) => {
	const url = baseURL !== '' ? `${baseURL}/` : '';
	return ({
		root: `/${url}`,
		title: 'Main',
		monitoring: {
			root: `/${url}monitoring`,
			title: 'Monitoring',
			icon: 'icon-monitoring',
		},
	});
};

const modulesRoutes = getModulesRoutes('');

export default modulesRoutes;
