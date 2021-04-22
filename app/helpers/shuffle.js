import { helper } from '@ember/component/helper';

/**
 * Fisher–Yates Shuffle
 */
export default helper(function shuffle([ items ]) {
  let curId = items.length;

  while (0 !== curId) {
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;

    let tmp = items[curId];
    items[curId] = items[randId];
    items[randId] = tmp;
  }

  return items;
});
