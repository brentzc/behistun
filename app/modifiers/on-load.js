import { modifier } from 'ember-modifier';

export default modifier(function onLoad(element, [ callback ]) {
  element.addEventListener('load', callback);

  return () => {
    element.removeEventListener('load', callback);
  }
});
