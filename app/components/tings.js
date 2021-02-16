import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
// import { annotate } from 'rough-notation';

export default class TingsComponent extends Component {
    @tracked show = true;

    @action toggleShow() {
        console.log('toggling');
        this.show = !this.show;
    }
}
