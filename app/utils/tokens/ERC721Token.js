import Token from './Token';

class ERC721Token extends Token {
  async fetchMetadata() {
    const link = await this.callContractMethod({ method: 'tokenURI' })();
    return fetch(link).then((response) => response.json());
  }

  get imageUrl() {
    const image = this.metadata.image;
    const cidStart = image.indexOf('/ipfs/');

    return cidStart === -1 ? image : 'https://ipfs.infura.io' + image.slice(cidStart);
  }

  get videoUrl() {
    return this.metadata.animation_url;
  }
}

export default ERC721Token;