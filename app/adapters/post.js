import Adapter from '@ember-data/adapter';

const path = '/data/posts.json';

export default class PostAdapter extends Adapter {
  findAll() {
    return fetch(path).then((response) => response.json());
  }

  findRecord(_, __, slug) {
    return fetch(path)
      .then((response) => response.json())
      .then((json) => json.find(post => post.slug === slug));
  }
}
