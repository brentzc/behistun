import Service from '@ember/service';
import { ethers } from 'ethers';

export default class Web3Service extends Service {
  constructor() {
    super();
    if (window.ethereum) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
    }
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
