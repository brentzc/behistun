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
  }
];

const erc1155ContractDefinition = [
  {
    constant: true,
    inputs: [
      {
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'uri',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  }
];

const hashmaskContractDefinition = [
  {
    constant: true,
    inputs: [
      {
        name: '_maskId',
        type: 'uint256',
      },
    ],
    name: 'getIPFSHashOfMaskId',
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
  {
    constant: true,
    inputs: [
      {
        name: '_maskId',
        type: 'uint256',
      },
    ],
    name: 'getTraitsOfMaskId',
    outputs: [
      { name: 'character', type: 'string' },
      { name: 'mask', type: 'string' },
      { name: 'eyeColor', type: 'string' },
      { name: 'skinColor', type: 'string' },
      { name: 'item', type: 'string' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

const CONTRACT_FOR_TYPE = {
  ERC1155: erc1155ContractDefinition,
  ERC721: erc721ContractDefinition,
  HASHMASK: hashmaskContractDefinition
}

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

  async getContract(contractAddress, contractType) {
    return new this.instance.eth.Contract(
      CONTRACT_FOR_TYPE[contractType],
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
