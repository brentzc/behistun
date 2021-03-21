import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default class HomePageIntroComponent extends Component {
  @service darkMode;
  @tracked showAnimation = false;

  @task *startAnimation() {
    yield timeout(2000);
    this.showAnimation = true;
  }
}
