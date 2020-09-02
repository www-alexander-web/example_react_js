// @flow

import React,
{
	useEffect,
} from 'react';
import {
	connect,
} from 'react-redux';

import useWindowDimensions from '@base/hooks/useWindowDimensions';
import {
	changeMeta,
} from '@base/store/Infos/actions';

import {
	BaseRouter,
} from '../routes';

import './App.module.scss';

type OwnProps = {|
|};

type AppProps = {|
	setMeta: (obj: {|
		widthDevice: number,
		heightDevice: number,
	|}) => void,
|};

export const App = ({
	setMeta,
}: AppProps) => {
	const {
		width, height,
	} = useWindowDimensions();

	useEffect(() => {
		if (setMeta) {
			setMeta({
				widthDevice: width,
				heightDevice: height,
			});
		}
	}, [
		setMeta,
		width,
		height,
	]);

	return (
		<div className="app">
			<BaseRouter />
		</div>
	);
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
	setMeta: (obj) => dispatch(changeMeta(obj)),
});

export default connect<_, OwnProps, _, _, _, _>(
	mapStateToProps,
	mapDispatchToProps,
)(App);
