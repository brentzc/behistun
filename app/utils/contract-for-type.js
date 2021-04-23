import contractDefinitions from './contractDefinitions';
const {
  erc721ContractDefinition,
  erc1155ContractDefinition,
  hashmaskContractDefinition
} = contractDefinitions;

export default function contractForType(type) {
  switch (type) {
    case 'ERC721':
    case 'KNOWN_ORIGIN':
    case 'FOUNDATION':
    case 'MAKERSPLACE':
      return erc721ContractDefinition;
    case 'ERC1155':
      return erc1155ContractDefinition;
    case 'HASHMASK':
      return hashmaskContractDefinition;
    default:
      throw new Error('Contract Not Supported');
  }
}