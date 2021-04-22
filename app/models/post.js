import Model, { attr } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';

export default class PostModel extends Model {
  @attr('string') url;
  @attr('string') title;
  @attr('string') slug;

  @tracked content = null;

  loadContent = async () => {
    this.content = await fetch(this.url).then(response => response.text());
  }
}