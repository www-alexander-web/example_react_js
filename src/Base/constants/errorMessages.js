// @flow

const FIELD_IS_REQUIRED = 'Field is required';
const INVALID_EMAIL = 'Invalid email';
const MUST_BE_A_NUMBER = 'Value must be a number';

function mustBeLessThanOrEqual(value: string): string {
	return `Must be less than or equal to ${value}`;
}
function mustBeGreaterThanOrEqual(value: string): string {
	return `Must be greater than or equal to ${value}`;
}
function mustBeGreaterThan(value: string): string {
	return `Must be greater than ${value}`;
}

function atLeastItems(value: string): string {
	return `Must be at least ${value} items`;
}

export default {
	FIELD_IS_REQUIRED,
	INVALID_EMAIL,
	MUST_BE_A_NUMBER,
	mustBeLessThanOrEqual,
	mustBeGreaterThanOrEqual,
	mustBeGreaterThan,
	atLeastItems,
};
