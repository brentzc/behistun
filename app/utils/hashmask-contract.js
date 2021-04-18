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

export default hashmaskContractDefinition;