import Service from '@ember/service';
import { ethers } from 'ethers';
import ENV from 'behistun/config/environment'

export default class Web3Service extends Service {
  constructor() {
    super();
    if (this.hasGlobalEth) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
    } else {
      // use etherscan provider if no browser addon is injecting web3
      this.provider = new ethers.providers.EtherscanProvider("homestead", ENV.APP.ETHERSCAN_API_KEY);
    }
  }

  get hasGlobalEth() {
    return !!window.ethereum;
  }

  get hasProvider() {
    return !!this.provider;
  }

  getContract(contractAddress, contractDefinition) {
    return new ethers.Contract(contractAddress, contractDefinition, this.provider);
  }

  callContractMethod(contract, method, args) {
    return contract[method](...args);
  }
}
