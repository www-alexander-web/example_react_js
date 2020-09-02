// @flow

import React from 'react';
import {
	Switch,
	Route,
	// Redirect,
} from 'react-router-dom';

import {
	getMenuPaths,
} from '@base/utils/getTabPaths';
import NotFoundPage from '@base/pages/NotFound';
import HomePage from '@base/pages/Home';
import MainLayoutConnected from '@base/pages/MainLayout';

import useNavigationLP from '@mg/hooks/useNavigation';
import {
	Accounts,
} from '@mg/pages/Accounts';
import monitoringRoutes from '@mg/constants/routes';

const menuLinksMonitoring = getMenuPaths(monitoringRoutes);


const MonitoringRouter = () => (
	<Switch>
		<Route
			exact
			path={monitoringRoutes.root}
			render={() => <HomePage to={monitoringRoutes.account.root} />}
		/>
		<Route path={monitoringRoutes.account.root} component={Accounts} />
		<Route component={NotFoundPage} />
	</Switch>
);

const MonitoringWithRouter = () => (
	<MainLayoutConnected menuLinks={menuLinksMonitoring} onUseNavigation={useNavigationLP}>
		<MonitoringRouter />
	</MainLayoutConnected>
);

export default MonitoringWithRouter;
