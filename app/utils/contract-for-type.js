import erc721ContractDefinition from './erc721-contract';
import erc1155ContractDefinition from './erc1155-contract';
import hashmaskContractDefinition from './hashmask-contract';

export default function contractForType(type) {
  return {
    ERC1155: erc1155ContractDefinition,
    ERC721: erc721ContractDefinition,
    HASHMASK: hashmaskContractDefinition
  }[type];
}