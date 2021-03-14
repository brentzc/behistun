import Model, { attr } from '@ember-data/model';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TokenModel extends Model {
  @service web3;

  @attr('string') marketplace;
  @attr('string') contractAddress;
  @attr('string') tokenId;
  @attr('string') contractDefinitionPath;
  @attr('string') contractType;

  @tracked metadata = null;

  async loadNft() {
    const { contractAddress, tokenId, contractType, metadata } = this;
    // simple memoization to prevent metadata from reloading unnecessarily
    if (metadata) return Promise.resolve();

    const contract = await this.web3.getContract(contractAddress, contractType);

    const method = contractType === 'ERC1155' ? 'uri' : 'tokenURI';
    const link = await this.web3.callContractMethod(contract, method, [ tokenId ]);

    const res = await fetch(link.replace('0x{id}', tokenId)).then((response) => response.json());

    this.metadata = res;
  }

  get imageUrl() {
    const image = this.metadata && this.metadata.image;
    if (!image) return null;

    const cidStart = image.indexOf('/ipfs/');
    return cidStart === -1 ? image : 'https://ipfs.infura.io' + image.slice(cidStart);
  }
}
