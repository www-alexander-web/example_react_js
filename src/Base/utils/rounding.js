// @flow

const setRounding = (
	value: number,
	number: number,
): string => value.toFixed(number).replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1');

export default setRounding;
