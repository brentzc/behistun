import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DarkModeService extends Service {
  @tracked enabled = false;

  @action toggleDarkMode() {
    const shouldBeDarkMode = !this.enabled;
    if (shouldBeDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    this.enabled = shouldBeDarkMode;
  }
}
