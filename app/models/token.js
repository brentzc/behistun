import Model, { attr } from '@ember-data/model';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import tokens from '../utils/tokens';
const { MakersPlaceToken, HashMaskToken, ERC1155Token, ERC721Token } = tokens;

export default class TokenModel extends Model {
  @service web3;

  @attr('string') slug;
  @attr('string') marketplace;
  @attr('string') contractAddress;
  @attr('string') metadataAddress; // unique to Hashmasks at the moment
  @attr('string') tokenId;
  @attr('string') contractDefinitionPath;
  @attr('string') contractType;
  @attr('boolean') isSold;
  @attr('string') sellDate;

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
    const services = { web3: this.web3 };

    switch (contractType) {
      case 'ERC721': {
        return new ERC721Token(tokenArgs, services);
      }
      case 'ERC1155': {
        return new ERC1155Token(tokenArgs, services)
      }
      case 'HASHMASK': {
        const hashmaskProperties = {
          metadataAddress: this.metadataAddress
        }
        return new HashMaskToken(tokenArgs, services, hashmaskProperties);
      }
      case 'MAKERSPLACE': {
        return new MakersPlaceToken(tokenArgs, services);
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
}
