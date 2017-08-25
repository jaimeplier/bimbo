module.exports = function(inputObj, keys) {
  return Object
    .keys(inputObj)
    .filter(key => keys.includes(key))
    .reduce((obj, key) => {
      obj[key] = inputObj[key];
      return obj;
    }, {})
}
