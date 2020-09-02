// @flow

const onlyInteger = new RegExp(/^$|^[0-9]+$/);
const onlyFloat = new RegExp(/^$|^\d+\.?\d*$/);

export default {
	onlyInteger,
	onlyFloat,
};
