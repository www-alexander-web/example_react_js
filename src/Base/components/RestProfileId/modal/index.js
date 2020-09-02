// @flow

import React from 'react';

import type { AccountsProfilesItem } from '@base/types/grups';
import Text from '@base/components/Text';

type RestProfileIdModalProps = {
	profiles: AccountsProfilesItem[],
};

const RestProfileIdModal = ({	profiles }: RestProfileIdModalProps) => (
	<ul>
		{profiles.map((profile) => (
			<li
				style={{
					lineHeight: '2.5rem',
					textAlign: 'left',
				}}
				key={profile.id}
			>
				<Text color="gray-light">{`${profile.id}. `}</Text>
				<Text>{profile.name}</Text>
			</li>
		))}
	</ul>
);

export default RestProfileIdModal;
