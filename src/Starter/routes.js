// @flow

import React from 'react';
import {
	Switch,
	// Route,
} from 'react-router-dom';

import routes from '@base/constants/routesModules';
import ConnectedPrivateRoute from '@base/containers/PrivateRoute';
import ConnectedAuth from '@base/containers/PrivateRoute/ConnectedRoute';

import MonitoringWithRouter from '@mg/routes/';

import authRoutes from '@auth/constants/routes';
import {
	AuthLoginLayoutWithRouter,
	AuthLayoutWithRouter,
} from '@auth/routes/';

export const BaseRouter = () => (
	<Switch>
		<ConnectedAuth
			path={authRoutes.auth.root}
			redirectTo={routes.root}
			component={AuthLayoutWithRouter}
		/>
		<ConnectedPrivateRoute
			redirectTo={authRoutes.auth.root}
			path={routes.monitoring.root}
			component={MonitoringWithRouter}
		/>
		<ConnectedPrivateRoute
			redirectTo={authRoutes.auth.root}
			path={routes.root}
			component={AuthLoginLayoutWithRouter}
		/>
	</Switch>
);

export default null;
