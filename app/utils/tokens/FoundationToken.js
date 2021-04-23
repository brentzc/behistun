import ERC721Token from './ERC721Token';

class FoundationToken extends ERC721Token {
  constructor(_, __, { marketplaceSlug }) {
    super(...arguments);
    this.marketplaceSlug = marketplaceSlug;
  }
  get marketplaceUrl() {
    return `https://foundation.app/${this.marketplaceSlug}`;
  }
}

export default FoundationToken;