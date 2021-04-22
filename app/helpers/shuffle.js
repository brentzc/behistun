import { helper } from '@ember/component/helper';

/**
 * Fisher–Yates Shuffle
 */
export default helper(function shuffle([ items ]) {
  let _items = Array.isArray(items) ? items : items.toArray();
  let curId = _items.length;

  while (0 !== curId) {
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;

    let tmp = _items[curId];
    _items[curId] = _items[randId];
    _items[randId] = tmp;
  }

  return _items;
});
