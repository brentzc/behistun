import Adapter from '@ember-data/adapter';

const path = '/data/tokens.json';

export default class TokenAdapter extends Adapter {
  findAll() {
    return fetch(path).then((response) => response.json());
  }

  findRecord(_, __, id) {
    return fetch(path)
      .then((response) => response.json())
      .then((json) => json.find((token) => token.id === id));
  }
}
