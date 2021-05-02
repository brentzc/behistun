import Token from './Token';
import fetch from 'fetch';

class MakersPlaceToken extends Token {
  constructor(_, __, { marketplaceSlug }) {
    super(...arguments);
    this.marketplaceSlug = marketplaceSlug;
  }
  async fetchMetadata(){
    const link = await this.callContractMethod({ method: 'tokenURI' });

    const cidStart = link.indexOf('/ipfs/');
    const url = 'https://ipfs.infura.io' + link.slice(cidStart);
    return fetch(url).then(response => response.json());
  }

  get imageUrl() {
    return this.metadata.imageUrl;
  }

  get videoUrl() {
    return this.metadata.properties.preview_media_file2.description;
  }

  get marketplaceUrl() {
    return `https://makersplace.com/${this.marketplaceSlug}`;
  }
}

export default MakersPlaceToken;