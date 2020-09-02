// @flow

import type {
	ExtractReturn,
} from '@base/utils/utilitiesTypes';
import {
	infosAction,
	infosSuccessAction,
	infosFailAction,
	changeMeta,
} from '@base/store/Infos/actions';

export type InfosAction = ExtractReturn<typeof infosAction>;
export type InfosSuccessAction = ExtractReturn<typeof infosSuccessAction>;
export type InfosFailAction = ExtractReturn<typeof infosFailAction>;
export type ChangeMeta = ExtractReturn<typeof changeMeta>;

export type InfosActions =
	| InfosAction
	| InfosSuccessAction
	| InfosFailAction
	| ChangeMeta;
