// @flow

import type {
	ChartOptionsInputsValues,
	ChartOptionsInputsTouched,
	ChartOptionsInputsErrors,
} from '.';

const values: ChartOptionsInputsValues = {
	windowSize: '',
	movingPeriod: '',
	period: '',
	multiplier: '',
};

const touched: ChartOptionsInputsTouched = {
	windowSize: false,
	movingPeriod: false,
	period: false,
	multiplier: false,
};

const errors: ChartOptionsInputsErrors = {
	windowSize: '',
	movingPeriod: '',
	period: '',
	multiplier: '',
};

export default {
	values,
	touched,
	errors,
};
