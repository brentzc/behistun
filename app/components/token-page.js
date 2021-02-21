import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TokenPageComponent extends Component {
  get image_path() {
    const image = this.args.metadata && this.args.metadata.image;

    if (!image) return null;
    const cidStart = image.indexOf('/ipfs/');
    return 'https://ipfs.infura.io' + image.slice(cidStart);
  }

  @tracked displayImage = false;
  @tracked modalOpen = false;

  @action allowDisplayImage() {
    this.displayImage = true;
  }

  @action toggleModal() {
    this.modalOpen = !this.modalOpen;
  }
}
