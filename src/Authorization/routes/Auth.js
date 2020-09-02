// @flow

import React from 'react';
import {
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import {
	Login,
} from '@auth/pages/Login';
import {
	TwoStepAuth,
} from '@auth/pages/TwoStepAuth';
import authRoutes from '@auth/constants/routes';

export const AuthRouter = () => (
	<Switch>
		<Route exact path={authRoutes.auth.login.root} component={Login} />
		<Route path={authRoutes.auth.twoStepAuth.root} component={TwoStepAuth} />
		<Route component={() => <Redirect to={authRoutes.root} />} />
	</Switch>
);

export default null;
