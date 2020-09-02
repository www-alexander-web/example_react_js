// @flow

// TODO: TDD

import React from 'react';
import {
	createMemoryHistory,
} from 'history';
import {
	Router,
	Route,
	Switch,
} from 'react-router-dom';
import {
	shallow,
} from 'enzyme';
import {
	action,
} from '@storybook/addon-actions';

import {
	ConnectedRoute,
} from '@base/containers/PrivateRoute/ConnectedRoute';

import {
	PrivateRoute,
} from '..';


const Page1 = () => <span>Hello Page1!</span>;

describe('The PrivateRoutes component', () => {
	it('PrivateRoute renders correctly', () => {
		const history = createMemoryHistory({
			initialEntries: [
				'/',
			],
		});
		const wrapper = shallow(
			// $FlowFixMe libdef error in react-router-dom and history
			<Router history={history}>
				<Switch>
					<PrivateRoute
						exact
						path="/"
						redirectTo="/page2"
						isAuth
						dispatch={action('component1')}
						component={Page1}
					/>
					<Route render={() => <span>XXXXX</span>} />
				</Switch>
			</Router>,
		);

		expect(wrapper.isEmptyRender()).not.toEqual(true);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('ConnectedRoute renders correctly', () => {
		const history = createMemoryHistory({
			initialEntries: [
				'/',
			],
		});
		const wrapper = shallow(
			// $FlowFixMe libdef error in react-router-dom and history
			<Router history={history}>
				<Switch>
					<ConnectedRoute
						exact
						path="/"
						redirectTo="/page2"
						isAuth
						dispatch={action('component1')}
						component={Page1}
					/>
					<Route render={() => <span>XXXXX</span>} />
				</Switch>
			</Router>,
		);

		expect(wrapper.isEmptyRender()).not.toEqual(true);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should redirect to Page2', () => {
		const history = createMemoryHistory({
			initialEntries: [
				'/',
			],
		});
		const wrapper = shallow(
			// $FlowFixMe libdef error in react-router-dom and history
			<Router history={history}>
				<Switch>
					<PrivateRoute
						exact
						path="/"
						redirectTo="/page2"
						isAuth={false}
						dispatch={action('component1')}
						component={Page1}
					/>
				</Switch>
			</Router>,
		);

		expect(wrapper.isEmptyRender()).not.toEqual(true);
		expect(wrapper.html()).toMatchSnapshot();
	});
});
