var filterObj = require('./filterObjectKeys.js');

module.exports = function filterDbObj(obj, keys) {
  return filterObj(obj.get({plain:true}), keys);
}
