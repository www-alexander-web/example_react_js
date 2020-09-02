// @flow

import React from 'react';
import cx from 'classnames';

import {
	Text,
	Input,
} from '@base/components';
import {
	CHART_OPTIONS_INPUTS_RANGE,
} from '@base/constants/ranges';
import { getErrorForInput } from '@base/utils/functions';

import styles from './ChartOptionsInputs.module.scss';

export type ChartOptionsInputsFields<T> = {|
	windowSize: T,
	movingPeriod: T,
	period: T,
	multiplier: T,
|};

export type ChartOptionsInputsValues = ChartOptionsInputsFields<string | number>;
export type ChartOptionsInputsTouched = ChartOptionsInputsFields<boolean | null | void>;
export type ChartOptionsInputsErrors = ChartOptionsInputsFields<string | null | void>;

type ChartOptionsInputsProps = {
	className?: string,
	values: ChartOptionsInputsValues,
	touched: ChartOptionsInputsTouched,
	errors: ChartOptionsInputsErrors,
	handleChange: ({
		value: string | number,
		name: string,
	}) => void,
	handleBlur: (event: SyntheticInputEvent<HTMLInputElement>) => void,
};

const MIN_MOVING_PERIOD = CHART_OPTIONS_INPUTS_RANGE.min.movingPeriod;
const MAX_MOVING_PERIOD = CHART_OPTIONS_INPUTS_RANGE.max.movingPeriod;
const MIN_WINDOW_SIZE = CHART_OPTIONS_INPUTS_RANGE.min.windowSize;
const MAX_WINDOW_SIZE = CHART_OPTIONS_INPUTS_RANGE.max.windowSize;
const MIN_PERIOD = CHART_OPTIONS_INPUTS_RANGE.min.period;
const MAX_PERIOD = CHART_OPTIONS_INPUTS_RANGE.max.period;
const MIN_MULTIPLIER = CHART_OPTIONS_INPUTS_RANGE.min.multiplier;
const MAX_MULTIPLIER = CHART_OPTIONS_INPUTS_RANGE.max.multiplier;

const ChartOptionsInputs = ({
	className,
	values,
	touched,
	errors,
	handleChange,
	handleBlur,
}: ChartOptionsInputsProps) => (
	<div
		className={cx(
			styles['chart-options-inputs'],
			className,
		)}
	>
		<Input
			name="windowSize"
			type="integer"
			required
			size="small"
			value={values.windowSize}
			onChange={handleChange}
			label="Window Size (min)"
			min={MIN_WINDOW_SIZE}
			max={MAX_WINDOW_SIZE}
			placeholder={`${MIN_WINDOW_SIZE}...${MAX_WINDOW_SIZE}`}
			onBlur={handleBlur}
			error={getErrorForInput(
				[
					touched.windowSize,
				],
				errors.windowSize,
			)}
			className={styles['chart-options-inputs__input']}
		/>
		<Text
			color="primary"
			className={styles['chart-options-inputs__label']}
		>
			Moving Average
		</Text>
		<Input
			name="movingPeriod"
			type="integer"
			required
			size="small"
			value={values.movingPeriod}
			onChange={handleChange}
			label="Moving Average Period"
			min={MIN_MOVING_PERIOD}
			max={MAX_MOVING_PERIOD}
			placeholder={`${MIN_MOVING_PERIOD}...${MAX_MOVING_PERIOD}`}
			onBlur={handleBlur}
			error={getErrorForInput(
				[
					touched.movingPeriod,
				],
				errors.movingPeriod,
			)}
			className={styles['chart-options-inputs__input']}
		/>

		<Text
			color="primary"
			className={styles['chart-options-inputs__label']}
		>
			Bollinger Bands
		</Text>
		<Input
			name="period"
			type="integer"
			required
			size="small"
			value={values.period}
			onChange={handleChange}
			label="Period"
			min={MIN_PERIOD}
			max={MAX_PERIOD}
			placeholder={`${MIN_PERIOD}...${MAX_PERIOD}`}
			onBlur={handleBlur}
			error={getErrorForInput(
				[
					touched.period,
				],
				errors.period,
			)}
			className={styles['chart-options-inputs__input']}
		/>
		<Input
			name="multiplier"
			type="float"
			numberAfterPoint={1}
			required
			size="small"
			value={values.multiplier}
			onChange={handleChange}
			label="Multiplier"
			min={MIN_MULTIPLIER}
			max={MAX_MULTIPLIER}
			step={0.1}
			placeholder={`${MIN_MULTIPLIER}...${MAX_MULTIPLIER}`}
			onBlur={handleBlur}
			error={getErrorForInput(
				[
					touched.multiplier,
				],
				errors.multiplier,
			)}
			className={styles['chart-options-inputs__input']}
		/>
	</div>
);

export default ChartOptionsInputs;
