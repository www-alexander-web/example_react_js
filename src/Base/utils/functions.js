// @flow

export function stub() {}

export const debounce = <T>(
	callback: (value: T | boolean) => void,
	delay: number,
) => {
	let clear = true;
	const timerClear = () => {
		clear = true;
	};
	return (value: T | boolean) => {
		if (clear) {
			clear = false;
			setTimeout(timerClear, delay);
			callback(value);
		}
	};
};

export const setNativeValue = (
	element: HTMLElement,
	value: string,
) => {
	const setter = Object.getOwnPropertyDescriptor(element, 'value');
	const valueSetter = setter ? setter.set : undefined;
	const prototype = Object.getPrototypeOf(element);
	const prototypeSetter = Object.getOwnPropertyDescriptor(prototype, 'value');
	const prototypeValueSetter = prototypeSetter ? prototypeSetter.set : undefined;

	if (valueSetter && valueSetter !== prototypeValueSetter && prototypeValueSetter) {
		prototypeValueSetter.call(element, value);
	} else if (valueSetter) {
		valueSetter.call(element, value);
	}
};

export const isNullableOrHalfFloat = (
	value: string | number,
): boolean => Number(value) === 0 || /^\d+\.0*$/.test(String(value));

export const getValueForNumberInput = (
	value: number | string,
	maxLengthFloatPart: number,
	factor: number = 1,
): number | string => {
	if (isNullableOrHalfFloat(value)) {
		return value;
	}
	const numberResult = Number(value) / factor;
	const floatPartMatch = String(numberResult).match(/\.\d*/);
	const floatPart = floatPartMatch ? floatPartMatch[0].replace('.', '') : '';
	if (floatPart.length > maxLengthFloatPart) {
		return Number(numberResult.toFixed(maxLengthFloatPart));
	}
	return numberResult;
};

export const getErrorForInput = (
	triggers: Array<string | boolean | null | void>,
	error: string | null | void,
): string => {
	if (triggers.every((item) => item) && error !== undefined) {
		return error || '';
	}
	return '';
};

export default null;
