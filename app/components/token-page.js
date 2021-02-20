import Component from '@glimmer/component';

export default class TokenPageComponent extends Component {
  get image_path() {
    const image = this.args.metadata && this.args.metadata.image;

    if (!image) return null;
    const cidStart = image.indexOf('/ipfs/');
    return 'https://ipfs.infura.io' + image.slice(cidStart);
  }
}
