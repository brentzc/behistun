import Model, { attr } from '@ember-data/model';

export default class TokenModel extends Model {
  @attr('string') marketplace;
  @attr('string') contractAddress;
  @attr('number') tokenId;
  @attr('string') contractDefinitionPath;
}
