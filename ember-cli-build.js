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
      urls: ({ distDir }) => {
        let urls = [ '/', '/blog' ];

        const posts = require(distDir + '/data/posts.json');
        for (const post of posts) {
          urls.push(`/blog/${post.slug}`);
        }

        return urls;
      }
    }
  });

  return app.toTree();
};
