/**
 * Container Generator
 */

module.exports = {
  description: 'Add a page component',
  prompts: [
    {
      type: 'rawlist',
      name: 'url',
      message: 'Which folder will be created?',
      choices: ['Base', 'LiquidityProvider', 'ExchangeBot', 'Authorization', 'ExchangeArbitrageBot', 'MarketMakerBot', 'TriangularArbitrageBot'],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Home',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const routes = {
      Base: '@base',
      Monitoring: '@mg',
      Authorization: '@auth',
    }
    data.routes = routes[data.url]
    const actions = [
      {
        type: 'add',
        path: '../src/{{ url }}/pages/{{ properCase name }}/index.js',
        templateFile: './page/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/{{ url }}/pages/{{ properCase name }}/__tests__/index.test.js',
        templateFile: './page/test.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/{{ url }}/pages/{{ properCase name }}/{{ properCase name }}.module.scss',
        templateFile: './page/scss.hbs',
        abortOnFail: true,
      },
    ];

    actions.push({
      type: 'prettify',
      path: `/${data.url}/pages/`,
    });

    return actions;
  },
};
