import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AnimatedLinkComponent extends Component {
  @tracked shouldAnimate = false;

  @action startAnimation() {
    this.shouldAnimate = true;
  }

  @action stopAnimation() {
    this.shouldAnimate = false;
  }
}
