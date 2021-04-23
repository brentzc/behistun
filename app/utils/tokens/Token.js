import contractForType from "../contract-for-type";

class Token {
  contractDefinition = null;

  contractForAddress = {}

  constructor({ contractAddress, tokenId, contractType, metadata }, { web3 }) {
    this.contractAddress = contractAddress;
    this.tokenId = tokenId;
    this.metadata = metadata;
    this.web3 = web3;

    this.contractDefinition = contractForType(contractType);
  }

  callContractMethod = ({ address = this.contractAddress, method }) => {
    const { tokenId, contractDefinition } = this;
    return async () => {
      if (!this.contractForAddress[address]) {
        this.contractForAddress[address] = await this.web3.getContract(address, contractDefinition);
      }

      return this.web3.callContractMethod(this.contractForAddress[address], method, [ tokenId ]);
    }
  }

  get etherscanUrl() {
    const { contractAddress, tokenId } = this;
    return `https://etherscan.io/token/${contractAddress}?a=${tokenId}`;
  }

  get marketplaceUrl() {
    return this.openseaUrl;
  }

  get openseaUrl() {
    const { contractAddress, tokenId } = this;
    return `https://opensea.io/assets/${contractAddress}/${tokenId}`;
  }
}

export default Token;