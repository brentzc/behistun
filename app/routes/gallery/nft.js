import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class GalleryNftRoute extends Route {
  @service store;
  model({ token_id }) {
    return this.store.findRecord('token', token_id);
  }
}
