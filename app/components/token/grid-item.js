import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TokenGridItemComponent extends Component {
  @tracked displayImage = false;

  @action allowDisplayImage() {
    this.displayImage = true;
  }

  @action async loadNft() {
    try {
      await this.args.token.loadNft();
    } catch (error) {
      console.error(error);
    }
  }
}
