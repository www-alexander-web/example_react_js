// @flow

import type {
	ChartOptionsInputsFields,
} from '@base/components/ChartOptionsInputs';

// eslint-disable-next-line import/prefer-default-export
export const CHART_OPTIONS_INPUTS_RANGE: {
    min: ChartOptionsInputsFields<number>,
    max: ChartOptionsInputsFields<number>,
} = {
	min: {
		windowSize: 30,
		movingPeriod: 2,
		period: 2,
		multiplier: 1,
	},
	max: {
		windowSize: 60,
		movingPeriod: 30,
		period: 30,
		multiplier: 3,
	},
};
