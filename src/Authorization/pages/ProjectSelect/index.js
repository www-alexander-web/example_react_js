// @flow
import React from 'react';
import cx from 'classnames';

import {
	Text,
	Logo,
	Button,
	Link,
} from '@base/components';
import avatar from '@base/assets/images/avatar.svg';
import Footer from '@base/containers/Footer';

import authRoutes from '@auth/constants/routes';
import CardProjectSelect from '@auth/pages/ProjectSelect/CardProjectSelect';

import styles from './ProjectSelect.module.scss';

type ProjectSelectProps = {
	className?: string,
}

const ProjectSelect = ({
	className,
}: ProjectSelectProps) => (
	<div className={cx(styles['project-select'], className)}>
		<section className={
			styles['project-select__header']
		}
		>
			<Button
				className={styles['project-select__link']}
				theme="icon"
				onClick={() => {}}
			>
				<i className="icon-menu" />
			</Button>

			<Link className={styles['project-select__logo']} to={authRoutes.auth['project-select'].root}>
				<Logo />
			</Link>
			<Button
				className={styles['project-select__link']}
				theme="icon"
				onClick={() => {}}
			>
				<i className="icon-bell-alt" />
			</Button>
			<div className={styles['project-select__info']}>
				<img
					className={styles['project-select__info-avatar']}
					src={avatar}
					alt="avatar in project select"
				/>
				<div className={styles['project-select__user']}>
					<Text className={styles['project-select__user-name']} type="h4" color="gray-dark">
						User Name
					</Text>
					<Text className={styles['project-select__user-rank']} color="gray-light">
						Rank: Starter
					</Text>
				</div>
			</div>
		</section>
		<section className={styles['project-select__main']}>
			<div className={styles['project-select__inner']}>
				<Text className={styles['project-select__title']} type="h1-extra" color="gray-dark">
					Welcome
				</Text>
				<Text className={styles['project-select__subtitle']} type="h2" color="gray-dark">
					Please select the Product
				</Text>
				<CardProjectSelect />
			</div>
		</section>
		<section className={styles['project-select__footer-mobile']}>
			<Footer />
		</section>
	</div>
);

export default ProjectSelect;
