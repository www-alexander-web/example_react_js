/**
 * Container Generator
 */

module.exports = {
  description: 'Add a redux boilerplate files (actions, reducers, constants, sagas)',
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
      default: 'Auth',
    },
    {
      type: 'confirm',
      name: 'isSaga',
      default: true,
      message: 'Do you want create sagas for handling async flow?',
    },
  ],
  actions: (data) => {
    // Generate index.js and index.test.js
    const routes = {
      Base: '@base',
      Monitoring: '@mg',
      Authorization: '@auth',
    }
    const reducer = {
      Base: 'BASE',
      Monitoring: 'MG',
      Authorization: 'AUTH',
    }
    data.routes = routes[data.url]
    data.reducer = reducer[data.url]
    const actions = [
      {
        type: 'add',
        path: '../src/{{ url }}/store/{{ properCase name }}/actions.js',
        templateFile: './redux/actions.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/{{ url }}/store/{{ properCase name }}/index.js',
        templateFile: './redux/reducers.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/{{ url }}/store/{{ properCase name }}/constants.js',
        templateFile: './redux/constants.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/{{ url }}/store/{{ properCase name }}/types.js',
        templateFile: './redux/types.js.hbs',
        abortOnFail: true,
      },
    ];

    if (data.isSaga) {
      actions.push({
        type: 'add',
        path: '../src/{{ url }}/store/{{ properCase name }}/sagas.js',
        templateFile: './redux/saga.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: `/${data.url}/store/`,
    });

    actions.push({
      type: 'log',
      message: "❗❗  Don't forget to import created reducer in 'store/rootReducer.js'\n",
    });

    if (data.isSaga) {
      actions.push({
        type: 'log',
        message: "❗❗  Don't forget to import and yield created saga in 'store/rootSaga.js'\n",
      });
    }

    return actions;
  },
};
