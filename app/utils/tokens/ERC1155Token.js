import Token from './Token';
import fetch from 'fetch';

class ERC1155Token extends Token {
  async fetchMetadata() {
    const link = await this.callContractMethod({ method: 'uri' });
    return fetch(link.replace('0x{id}', this.tokenId)).then((response) => response.json());
  }

  get imageUrl() {
    return this.metadata.image;
  }
}

export default ERC1155Token;