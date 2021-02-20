import Service from '@ember/service';
import Web3 from 'web3/dist/web3.min.js';

const erc721ContractDefinition = [
  {
    constant: true,
    inputs: [
      {
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

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

  async getContract(contractAddress) {
    return new this.instance.eth.Contract(
      erc721ContractDefinition,
      contractAddress
    );
  }
}
