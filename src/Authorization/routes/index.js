// @flow

import React from 'react';
import {
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import {
	AuthLayout,
} from '@auth/containers/AuthLayout';
import {
	AuthRouter,
} from '@auth/routes/Auth';
import authRoutes from '@auth/constants/routes';
import ProjectSelect from '@auth/pages/ProjectSelect';

export const AuthLoginLayoutWithRouter = () => (
	<AuthLayout>
		<Switch>
			<Route
				exact
				path={authRoutes.root}
				render={() => <ProjectSelect to={authRoutes.auth['project-select'].root} />}
			/>
			<Route path={authRoutes.auth['project-select'].root} component={ProjectSelect} />
			<Route component={() => <Redirect to={authRoutes.root} />} />
		</Switch>
	</AuthLayout>
);

export const AuthLayoutWithRouter = () => (
	<AuthLayout>
		<AuthRouter />
	</AuthLayout>
);

export default null;
