import Service from '@ember/service';
const hicdexUrl = 'https://api.hicdex.com/v1/graphql';

const query = `
  query Objkt($id: bigint!) {
    hic_et_nunc_token_by_pk(id: $id) {
      artifact_uri
      creator_id
      description
      display_uri
      id
      level
      mime
      royalties
      supply
      thumbnail_uri
      metadata
      timestamp
      title
    }
  }
`;

export default class TezosService extends Service {
  getTokenMetadata = async tokenId => {
    return fetch(hicdexUrl, {
      method: 'POST',
      body: JSON.stringify({
        query: query,
        operationName: 'Objkt',
        variables: {
          id: tokenId
        }
      })
    }).then(res => res.json()).then(json => json.data.hic_et_nunc_token_by_pk);
  }
}
