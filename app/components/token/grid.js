import Component from '@glimmer/component';
import fade from 'ember-animated/transitions/fade';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';

export default class TokenGridComponent extends Component {
  @tracked items = [];

  transition = fade;

  @task *setAnimatedItems() {
    for (const token of this.args.tokens) {
      yield timeout(300);
      this.items = [ ...this.items, token ];
    }
  }
}
