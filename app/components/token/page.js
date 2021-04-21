import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TokenPageComponent extends Component {
  @tracked displayImage = false;
  @tracked modalOpen = false;

  @action allowDisplayImage() {
    this.displayImage = true;
  }

  @action toggleModal() {
    this.modalOpen = !this.modalOpen;
  }

  @action async loadTokenMetadata() {
    try {
      await this.args.token.fetchMetadata();
    } catch (error) {
      console.error(error);
    }
  }
}
