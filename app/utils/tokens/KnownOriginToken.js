import ERC721Token from './ERC721Token';

class KnownOriginToken extends ERC721Token {
  get marketplaceUrl() {
    return `https://knownorigin.io/tokens/${this.tokenId}`;
  }
}

export default KnownOriginToken;