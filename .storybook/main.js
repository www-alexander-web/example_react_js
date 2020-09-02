const custom = require('../webpack.config');

module.exports = {
	addons: [
		'@storybook/addon-actions/register',
		'@storybook/addon-links/register',
		'@storybook/preset-create-react-app',
	],
	webpackFinal: async (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			...custom.resolve.alias,
		};

		return config;
	},
};
