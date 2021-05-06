import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class GalleryIndexRoute extends Route {
  @service store;
  @service web3;

  model() {
    return this.store.findAll('token');
  }

  setupController(controller) {
    super.setupController(...arguments);

    controller.set('web3', this.web3);
  }
}
