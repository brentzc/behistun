import { helper } from '@ember/component/helper';

export default helper(function arrayJoin([ items ], { seperator }) {
  let _items = Array.isArray(items) ? items : items.toArray();
  return _items.join(seperator);
});
