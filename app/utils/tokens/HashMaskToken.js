import Token from './Token';
class HashMaskToken extends Token {
  constructor(_, __, { metadataAddress }) {
    super(...arguments);
    this.metadataAddress = metadataAddress;
  }
  async fetchMetadata(){
    const { tokenId, metadataAddress } = this;
    const ipfsHash = await this.callContractMethod({ address: metadataAddress, method: 'getIPFSHashOfMaskId' })();
    const attributes = await this.callContractMethod({ address: metadataAddress, method: 'getTraitsOfMaskId' })();

    return {
      image: `https://ipfs.infura.io/ipfs/${ipfsHash}`,
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
    return this.metadata.image;
  }
}

export default HashMaskToken;