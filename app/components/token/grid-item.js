import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TokenGridItemComponent extends Component {
  @tracked displayImage = false;

  @action allowDisplayImage() {
    this.displayImage = true;
  }

  @action async loadTokenMetadata() {
    try {
      await this.args.token.loadMetadata();
    } catch (error) {
      console.error(error);
    }
  }
}
