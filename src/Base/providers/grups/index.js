/* eslint-disable max-classes-per-file */
// @flow
import AccountsProvider from './accounts';
import AuthProvider from './auth';
import InfoProvider from './info';


const aggregation = (baseClass, ...mixins) => {
	const base = class _Combined extends baseClass {
		// $FlowFixMe
		constructor(...args) {
			super(...args);
			mixins.forEach((mixin) => {
				// $FlowFixMe
				mixin.prototype.initializer.call(this);
			});
		}
	};
	const copyProps = (target, source) => {
		Object.getOwnPropertyNames(source)
			.concat(Object.getOwnPropertySymbols(source))
			.forEach((prop) => {
				// $FlowFixMe
				if (prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) return;
				// $FlowFixMe
				Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
			});
	};
	mixins.forEach((mixin) => {
		copyProps(base.prototype, mixin.prototype);
		copyProps(base, mixin);
	});
	return base;
};


class ApiProvider extends aggregation(
	AuthProvider,
	AccountsProvider,
	InfoProvider,
) {}

export default ApiProvider;
