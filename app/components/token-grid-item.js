import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TokenGridItemComponent extends Component {
  get image_path() {
    const image = this.args.metadata && this.args.metadata.image;

    if (!image) return null;
    const cidStart = image.indexOf('/ipfs/');
    return 'https://ipfs.infura.io' + image.slice(cidStart);
  }

  @tracked displayImage = false;

  @action allowDisplayImage() {
    this.displayImage = true;
  }
}
