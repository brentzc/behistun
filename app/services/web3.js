import Service from '@ember/service';
import Web3 from 'web3/dist/web3.min.js';
import contractForType from '../utils/contract-for-type';

export default class Web3Service extends Service {
  constructor() {
    super();
    if (Web3.givenProvider) {
      this.instance = new Web3(Web3.givenProvider);
    }
  }

  get hasProvider() {
    return Boolean(Web3.givenProvider);
  }

  getContract(contractAddress, contractType) {
    return new this.instance.eth.Contract(
      contractForType(contractType),
      contractAddress
    );
  }

  async callContractMethod(contract, method, args) {
    const contractMethod = await contract.methods[method](...args);

    return new Promise((resolve, reject) => {
      contractMethod.call({}, (error, result) => {
        if (error) reject(error);

        resolve(result);
      })
    });
  }
}
