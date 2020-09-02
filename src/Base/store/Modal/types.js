// @flow

import type {
	ExtractReturn,
} from '@base/utils/utilitiesTypes';
import {
	modalOpenAction,
	modalCloseAction,
} from '@base/store/Modal/actions';

export type ModalActions =
	| ExtractReturn<typeof modalOpenAction>
	| ExtractReturn<typeof modalCloseAction>
