import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class GalleryRoute extends Route {
  @service web3;

  beforeModel() {
    if (!this.web3.hasProvider) {
      this.transitionTo('provider-not-found');
    }
  }
}
