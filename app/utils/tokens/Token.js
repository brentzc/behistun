class Token {
  tokenContract = null;

  contractForAddress = {}

  constructor({ contractAddress, tokenId, contractType, metadata }, { web3 }) {
    this.contractAddress = contractAddress;
    this.tokenId = tokenId;
    this.contractType = contractType;
    this.metadata = metadata;
    this.web3 = web3;
  }

  callContractMethod = ({ address = this.contractAddress, method }) => {
    const { tokenId, contractType } = this;
    return async () => {
      if (!this.contractForAddress[address]) {
        this.contractForAddress[address] = await this.web3.getContract(address, contractType);
      }

      return this.web3.callContractMethod(this.contractForAddress[address], method, [ tokenId ]);
    }
  }
}

export default Token;