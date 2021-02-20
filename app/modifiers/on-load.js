import { modifier } from 'ember-modifier';

export default modifier(function onLoad(element, [ callback ]) {
  function eventListener() {
    console.log('LOADED');
  }

  element.addEventListener('load', callback);

  return () => {
    element.removeEventListener('load', callback);
  }
});
