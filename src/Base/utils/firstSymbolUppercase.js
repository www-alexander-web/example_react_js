// @flow

const firstSymbolUppercase = (
	value: string,
) => (value.charAt(0).toUpperCase() + value.substr(1));

export default firstSymbolUppercase;
