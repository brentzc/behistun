import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BlogPostRoute extends Route {
  @service store;

  model({ post_title }) {
    return this.store.findRecord('post', post_title);
  }
}
