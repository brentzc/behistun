import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class GalleryIndexRoute extends Route {
  @service store;
  model() {
    return this.store.findAll('token');
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('tokens', model.toArray());
  }
}
