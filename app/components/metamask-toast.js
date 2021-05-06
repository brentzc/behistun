import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

const positionHidden = '-bottom-32';
const positionVisible = 'bottom-4';

export default class MetamaskToastComponent extends Component {
  @service metamask;

  @tracked position = positionHidden;

  @task *startTimer() {
    yield timeout(2000);
    this.position = positionVisible;
    yield timeout(10000);
    this.position = positionHidden;
  }

  startOnboarding = () => {
    this.metamask.startOnboarding();
  }
}
