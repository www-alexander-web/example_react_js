// @flow

import React from 'react';
import {
	Redirect,
} from 'react-router-dom';
import {
	connect,
} from 'react-redux';


import './Home.module.scss';


type OwnProps = {|
	to: string,
|};

type HomeProps = {
  ...OwnProps
};


export const Home = ({
	to,
}: HomeProps) => (
	<div className="home">
		Hello World!
		<Redirect to={to} />
	</div>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect<_, OwnProps, _, _, _, _>(
	mapStateToProps,
	mapDispatchToProps,
)(Home);
