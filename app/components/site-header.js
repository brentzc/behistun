import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class SiteHeaderComponent extends Component {
    @service darkMode;
    @service store;

    @tracked navDrawerOpen = false;

    @action toggleNavDrawer() {
        this.navDrawerOpen = !this.navDrawerOpen;
    }

    loadTokens = () => {
        this.store.findAll('token')
    }
}
