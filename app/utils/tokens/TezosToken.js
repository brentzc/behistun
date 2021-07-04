class TezosToken {
  ipfsPrefix = 'ipfs://';
  staticUrlPrefix = 'https://cloudflare-ipfs.com/ipfs/';
  videoUrlPrefix = 'https://ipfs.io/ipfs/';

  constructor({ contractAddress, tokenId, metadata }, { tezos }) {
    this.contractAddress = contractAddress;
    this.tokenId = tokenId;
    this.metadata = metadata;
    this.tezos = tezos;
  }

  async fetchMetadata() {
    const metadata = await this.tezos.getTokenMetadata(this.tokenId);
    return {
      ...metadata,
      name: metadata.title
    }
  }

  get imageUrl() {
    return this.videoUrlPrefix + this.metadata.artifact_uri.slice(this.ipfsPrefix.length);
  }

  get videoUrl() {
    return this.videoUrlPrefix + this.metadata.artifact_uri.slice(this.ipfsPrefix.length);
  }

  get title() {
    return this.metadata.title;
  }

  get marketplaceUrl() {
    return `https://www.hicetnunc.xyz/objkt/${this.tokenId}`;
  }
}

export default TezosToken;