import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class GalleryRoute extends Route {
  @service web3;
  @service fastboot;

  beforeModel() {
    if (!this.web3.hasProvider && !this.fastboot.isFastBoot) {
      this.transitionTo('provider-not-found');
    }
  }
}
