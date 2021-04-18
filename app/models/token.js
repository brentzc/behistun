import Model, { attr } from '@ember-data/model';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TokenModel extends Model {
  @service web3;

  @attr('string') marketplace;
  @attr('string') contractAddress;
  @attr('string') metadataAddress; // unique to Hashmasks at the moment
  @attr('string') tokenId;
  @attr('string') contractDefinitionPath;
  @attr('string') contractType;
  @attr('boolean') isSold;
  @attr('string') sellDate;

  @tracked metadata = null;

  loadMetadata() {
    const { metadata, contractType } = this;
    // simple memoization to prevent metadata from reloading unnecessarily
    if (metadata) return Promise.resolve();

    return {
      ERC721: this.loadStandardMetadata('tokenURI'),
      ERC1155: this.loadStandardMetadata('uri'),
      HASHMASK: this.loadHashmaskMetadata
    }[contractType]();
  }

  loadStandardMetadata = method => {
    return async () => {
      const { contractAddress, tokenId, contractType } = this;

      const contract = await this.web3.getContract(contractAddress, contractType);
      const link = await this.web3.callContractMethod(contract, method, [ tokenId ]);
      const res = await fetch(link.replace('0x{id}', tokenId)).then((response) => response.json());

      this.metadata = res;
    }
  }

  loadHashmaskMetadata = async () => {
    const { metadataAddress, tokenId, contractType } = this;

    const contract = await this.web3.getContract(metadataAddress, contractType);

    const getHash = this.web3.callContractMethod(contract, 'getIPFSHashOfMaskId', [ tokenId ]);
    const getTraits = this.web3.callContractMethod(contract, 'getTraitsOfMaskId', [ tokenId ]);

    const [ ipfsHash, attributes ] = await Promise.all([ getHash, getTraits ]);

    this.metadata = {
      image: `/ipfs/${ipfsHash}`,
      name: `Hashmask #${tokenId}`,
      description: 'Hashmasks is a living digital art collectible created by over 70 artists globally. It is a collection of 16,384 unique digital portraits. Brought to you by Suum Cuique Labs from Zug, Switzerland.',
      attributes: [
        { key: 'Character', value: attributes.character },
        { key: 'Eye Color', value: attributes.eyeColor },
        { key: 'Item', value: attributes.item },
        { key: 'Mask', value: attributes.mask },
        { key: 'Skin Color', value: attributes.skinColor },
      ]
    }
  }

  get imageUrl() {
    const image = this.metadata && this.metadata.image;
    if (!image) return null;

    const cidStart = image.indexOf('/ipfs/');
    return cidStart === -1 ? image : 'https://ipfs.infura.io' + image.slice(cidStart);
  }
}
