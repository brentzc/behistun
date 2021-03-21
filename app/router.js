import EmberRouter from '@ember/routing/router';
import config from 'behistun/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home', { path: '/' }, function() {});
  this.route('gallery', function() {
    this.route('nft', { path: '/:token_id' });
  });
  this.route('provider-not-found');
  this.route('blog', function() {
    this.route('post', { path: '/:post_title' });
  });
});
