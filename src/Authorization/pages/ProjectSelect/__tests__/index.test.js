// @flow

import React from 'react';
import {
	shallow,
} from 'enzyme';
import {
	MemoryRouter,
} from 'react-router-dom';

import CardProjectSelect 	from '@auth/pages/ProjectSelect/CardProjectSelect';
import ProjectSelect 	from '@auth/pages/ProjectSelect';


describe('The Settings component', () => {
	it('CardProjectSelect should renders correctly', () => {
		const wrapper = shallow(
			<MemoryRouter initialEntries={[
				'/project-select',
			]}
			>
				<CardProjectSelect />
			</MemoryRouter>,
		);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});

	it('ProjectSelect should renders correctly', () => {
		const wrapper = shallow(
			<MemoryRouter initialEntries={[
				'/project-select',
			]}
			>
				<ProjectSelect />
			</MemoryRouter>,
		);
		expect(wrapper.isEmptyRender()).not.toEqual(true);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
