const path = require('path');
const CracoAlias = require('craco-alias');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const sassResourcesLoader = require('craco-sass-resources-loader');

module.exports = {
  webpack: {
    plugins: [
      new StyleLintPlugin(
          {
            configBasedir: __dirname,
            context: path.resolve(__dirname, 'srcMonitoring'),
            color: true,
            fix: true,
            lintDirtyModulesOnly: true,
          },
      ),
    ],
    rules: [
      {
        test: /\.scss$/i,
        loader: 'css-loader',
        options: {
          modules: true,
        },
      },
    ]
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        aliases: {
          '@starter': '/src/Starter',
          '@base': '/src/Base',
          '@mg': '/src/Monitoring',
          '@auth': '/src/Authorization',
        },
      },
    },
      {
          plugin: sassResourcesLoader,
          options: {
              resources: [
                  path.resolve(__dirname, './src/Base/assets/styles/_mixins.scss'),
              ],
          },
      },

  ],
  jest: {
    configure(config) {
      config.roots = [
          '<rootDir>/src/Starter',
          '<rootDir>/src/Base',
          '<rootDir>/src/Monitoring',
          '<rootDir>/src/Authorization',
      ];
      config.setupFilesAfterEnv = ['<rootDir>config/jest/setup.js'];
      config.transformIgnorePatterns = [
        "<rootDir>/node_modules/lightweight-charts.js",
      ];
      return config;
    },
  },
};
