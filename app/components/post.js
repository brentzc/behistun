import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PostComponent extends Component {

  @tracked content = null;

  @action async getContent() {
    const { post } = this.args;
    this.content = await fetch(post.url).then(response => response.text());
  }
}
