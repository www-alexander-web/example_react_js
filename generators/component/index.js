/**
 * Component Generator
 */

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'rawlist',
      name: 'url',
      message: 'Which folder will be created?',
      choices: ['Base'],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
    },
    {
      type: 'confirm',
      name: 'isStory',
      default: true,
      message: 'Do you want stories for this component?',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const routes = {
      Base: '@base'
    }
    data.routes = routes[data.url]
    const actions = [
      {
        type: 'add',
        path: '../src/{{ url }}/components/{{properCase name}}/index.js',
        templateFile: './component/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/{{ url }}/components/{{ properCase name }}/__tests__/index.test.js',
        templateFile: './component/test.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/{{ url }}/components/{{ properCase name }}/{{ properCase name }}.module.scss',
        templateFile: './component/scss.hbs',
        abortOnFail: true,
      },
    ];

    if (data.isStory) {
      actions.push({
        type: 'add',
        path: '../src/{{ url }}/components/{{ properCase name }}/{{properCase name}}.stories.js',
        templateFile: './component/story.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: `/${data.url}/components/`,
    });

    return actions;
  },
};
