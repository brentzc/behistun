import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class MetamaskOnboarderComponent extends Component {
  @service metamask;
  @service web3;
  @service router;

  @action startOnboarding() {
    this.metamask.startOnboarding();
  }

  @action checkOnboardingStatus() {
    if (this.web3.hasProvider || this.metamask.isInstalled) {
      this.router.transitionTo('gallery');
    }
  }
}
