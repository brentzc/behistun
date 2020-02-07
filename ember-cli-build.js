'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const isProduction = EmberApp.env() === 'production';
const { join } = require('path');

const purgeCSS = {
  module: require('@fullhuman/postcss-purgecss'),
  options: {
    content: [
      // add extra paths here for components/controllers which include tailwind classes
      join(__dirname, 'app', 'index.html'),
      join(__dirname, 'app', 'templates', '**', '*.hbs')
    ],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
  }
}

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    postcssOptions: {
      compile: {
        plugins: [
          {
            module: require('postcss-import'),
            options: {
              path: [ 'node_modules' ]
            }
          },
          require('tailwindcss')('./app/tailwind/config.js'),
          ...isProduction ? [ purgeCSS ] : []
        ]
      }
    }
  });

  return app.toTree();
};
