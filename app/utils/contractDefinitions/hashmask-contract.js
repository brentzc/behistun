const hashmaskContractDefinition = [
  'function getIPFSHashOfMaskId(uint256 _maskId) view returns (string)',
  `function getTraitsOfMaskId(uint256 _maskId)
    view
    returns (
      string memory character,
      string memory mask,
      string memory eyeColor,
      string memory skinColor,
      string memory item
    )`
];

export default hashmaskContractDefinition;