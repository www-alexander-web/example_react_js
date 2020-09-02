/**
 * Container Generator
 */

module.exports = {
  description: 'Add a container component',
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
      default: 'Form',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const routes = {
      Base: '@base',
      LiquidityProvider: '@mg',
      Authorization: '@auth',
    }
    data.routes = routes[data.url]
    const actions = [
      {
        type: 'add',
        path: '../src/{{ url }}/containers/{{ properCase name }}/index.js',
        templateFile: './container/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/{{ url }}/containers/{{ properCase name }}/__tests__/index.test.js',
        templateFile: './container/test.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/{{ url }}/containers/{{properCase name}}/{{ properCase name }}.module.scss',
        templateFile: './container/scss.hbs',
        abortOnFail: true,
      },
    ];

    actions.push({
      type: 'prettify',
      path: `/${data.url}/containers/`,
    });

    return actions;
  },
};
