// @flow

import React from 'react';
import {
	connect,
} from 'react-redux';
import {
	Route,
	Redirect,
	type ContextRouter,
	type LocationShape,
} from 'react-router-dom';

import type {
	BaseState,
} from '@base/types';

// OwnProps refers to the props that were passed down by the parent.
type OwnProps = {|
	component: React$ComponentType<ContextRouter>,
	render?: (router: ContextRouter) => React$Node,
	children?: React$ComponentType<ContextRouter> | React$Node,
	path?: string | Array<string>,
	exact?: boolean,
	strict?: boolean,
	location?: LocationShape,
	sensitive?: boolean,
	redirectTo: string
|};

// Props created from OwnProps plus the props passed in by mapStateToProps and mapDispatchToProps
type Props = {|
	...OwnProps,
	isAuth: boolean,
	dispatch: () => void,
|};

export function PrivateRoute({
	component: Component,
	isAuth,
	redirectTo,
	dispatch,
	...rest
}: Props) {
	return (
		/* eslint-disable react/jsx-props-no-spreading */
		<Route
			{...rest}
			render={(props) => (
				isAuth
					? <Component {...props} />
					: (
						<Redirect to={{
							pathname: redirectTo,
							state: {
								from: props.location,
							},
						}}
						/>
					)
			)}
		/>
		/* eslint-enable react/jsx-props-no-spreading */
	);
}

const mapStateToProps = ({
	base,
}: BaseState) => ({
	isAuth: base.auth.isAuth,
});

export default connect<_, OwnProps, _, _, _, _>(
	mapStateToProps,
)(PrivateRoute);
