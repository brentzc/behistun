import Token from './Token';
class MakersPlaceToken extends Token {
  async fetchMetadata(){
    const link = await this.callContractMethod({ method: 'tokenURI' })();

    const cidStart = link.indexOf('/ipfs/');
    const url = 'https://ipfs.infura.io' + link.slice(cidStart);
    return fetch(url).then(response => response.json());
  }

  get imageUrl() {
    return this.metadata.imageUrl;
  }
}

export default MakersPlaceToken;