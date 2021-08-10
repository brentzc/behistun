import Model, { attr } from '@ember-data/model';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import tokens from '../utils/tokens';
const {
  MakersPlaceToken,
  HashMaskToken,
  ERC1155Token,
  ERC721Token,
  FoundationToken,
  KnownOriginToken,
  TezosToken
} = tokens;

const Marketplaces = {
  FOUNDATION: 'Foundation',
  OPENSEA: 'OpenSea',
  KNOWN_ORIGIN: 'Known Origin',
  MAKERSPLACE: 'MakersPlace',
  HIC_ET_NUNC: 'Hic Et Nunc'
}

const Blockchains = {
  ETHEREUM: 'ETHEREUM',
  TEZOS: 'TEZOS'
}

export default class TokenModel extends Model {
  @service web3;
  @service tezos;

  @attr('string') slug;
  @attr('string') marketplace;
  @attr('string') contractAddress;
  @attr('string') tokenId;
  @attr('string') contractDefinitionPath;
  @attr('string') contractType;
  @attr('boolean') isSold;
  @attr('string') sellDate;
  @attr('string') fileType;
  @attr('string') artist;

  @attr('string') metadataAddress; // unique to Hashmasks at the moment
  @attr('string') marketplaceSlug;

  @tracked metadata = null;

  async fetchMetadata() {
    const { metadata } = this;
    // simple memoization to prevent metadata from reloading unnecessarily
    if (metadata) return Promise.resolve();

    this.metadata = await this.tokenClass.fetchMetadata();
  }

  get tokenClass() {
    const { contractType, contractAddress, tokenId, metadata } = this;
    const tokenArgs = {
      contractType,
      contractAddress,
      tokenId,
      metadata,
    };
    const services = { web3: this.web3, tezos: this.tezos };

    switch (contractType) {
      case 'ERC721': {
        return new ERC721Token(tokenArgs, services);
      }
      case 'ERC1155': {
        return new ERC1155Token(tokenArgs, services)
      }
      case 'KNOWN_ORIGIN': {
        return new KnownOriginToken(tokenArgs, services);
      }
      case 'FOUNDATION': {
        const foundationProperties = {
          marketplaceSlug: this.marketplaceSlug
        }
        return new FoundationToken(tokenArgs, services, foundationProperties);
      }
      case 'HASHMASK': {
        const hashmaskProperties = {
          metadataAddress: this.metadataAddress
        }
        return new HashMaskToken(tokenArgs, services, hashmaskProperties);
      }
      case 'MAKERSPLACE': {
        const makersplaceProperties = {
          marketplaceSlug: this.marketplaceSlug
        }
        return new MakersPlaceToken(tokenArgs, services, makersplaceProperties);
      }
      case 'HIC_ET_NUNC': {
        return new TezosToken(tokenArgs, services);
      }
      default: {
        throw new Error('Unsupported Contract Type');
      }
    }
  }

  get imageUrl() {
    if (!this.metadata) return null;

    return this.tokenClass.imageUrl;
  }

  get videoUrl() {
    if (!this.metadata || this.fileType !== 'VIDEO') return null;

    return this.tokenClass.videoUrl;
  }

  get interactiveUrl() {
    if (!this.metadata || this.fileType !== 'INTERACTIVE') return null;

    return this.tokenClass.interactiveUrl;
  }

  get etherscanUrl() {
    return this.tokenClass.etherscanUrl;
  }

  get marketplaceUrl() {
    return this.tokenClass.marketplaceUrl;
  }

  get openseaUrl() {
    return this.tokenClass.openseaUrl;
  }

  get marketplaceName() {
    return Marketplaces[this.marketplace];
  }

  get blockchain() {
    switch(this.marketplaceName) {
      case Marketplaces.HIC_ET_NUNC: {
        return Blockchains.TEZOS;
      }
      default: {
        return Blockchains.ETHEREUM;
      }
    }
  }
}
