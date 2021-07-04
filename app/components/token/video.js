import Component from '@glimmer/component';

export default class TokenVideoComponent extends Component {
  canPlay = ({ target }) => {
    target.muted = true;
    target.play();
  }
}
