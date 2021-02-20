import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class NftProviderComponent extends Component {
  @service web3;

  @tracked uri = null;
  @tracked image = null;
  @tracked metadata = {};

  @action async loadNft() {
    try {
      const { contractAddress, tokenId } = this.args.token;
      const contract = await this.web3.getContract(contractAddress);

      const uri = await contract.methods.tokenURI(tokenId);

      const link = await new Promise((resolve, reject) => {
        uri.call({}, (error, result) => {
          if (error) reject(error);

          resolve(result);
        });
      });

      const res = await fetch(link).then((response) => response.json());
      const { image } = res;
      this.uri = image;
      this.metadata = res;
    } catch (error) {
      console.log(error);
    }
  }
}
