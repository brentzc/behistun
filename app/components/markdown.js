import Component from '@glimmer/component';
import MarkdownIt from 'markdown-it';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/template';
import emoji from 'markdown-it-emoji';
import footnote from 'markdown-it-footnote';

export default class MarkdownComponent extends Component {
  md = null;
  @tracked source = 'Hello, *markdown*!';
  constructor() {
    super(...arguments);
    const md = new MarkdownIt();
    md.use(emoji);
    md.use(footnote);
    this.md = md;
  }

  get html() {
    return htmlSafe(this.md.render(this.args.content));
  }
}
