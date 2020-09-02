// @flow

import React from 'react';
import cx from 'classnames';

import type { AccountsProfilesItem } from '@base/types/grups';
import Tooltip from '@base/components/Tooltip';

import RestProfileIdModal from './modal';
import styles from './index.module.scss';

type RestProfileIdProps = {|
	name: string,
	profiles: AccountsProfilesItem[],
	className?: string,
	countDisplayedItem?: number,
|};

const RestProfileId = ({
	name,
	profiles,
	className,
	countDisplayedItem = 3,
}: RestProfileIdProps) => {
	const restCount = profiles.length - countDisplayedItem;
	const firstItems = profiles.slice(0, countDisplayedItem);
	const hasRest = profiles.length > countDisplayedItem;
	const getIdsForRender = () => firstItems.map((profile) => profile.id).join(', ');

	return (
		<div className={cx(styles['rest-profile-id'], className)}>
			{hasRest && `${getIdsForRender()} `}
			<span className={styles['rest-profile-id__active-text']}>
				<Tooltip
					name={name}
					target={hasRest ? `+${restCount} more` : getIdsForRender()}
					content={<RestProfileIdModal profiles={profiles} />}
				/>
			</span>
		</div>
	);
};

export default RestProfileId;
