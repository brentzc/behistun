'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    postcssOptions: {
      compile: {
        plugins: [
          {
            module: require('autoprefixer'),
            options: {}
          },
          {
            module: require('postcss-import'),
            options: {
              path: [ 'node_modules' ]
            }
          },
          require('tailwindcss')('./app/tailwind/config.js'),
        ]
      }
    },
    prember: {
      urls: [
        '/',
        '/blog/three-things-march-2021',
        '/blog/one-thing-april-2021',
      ]
    }
  });

  return app.toTree();
};
