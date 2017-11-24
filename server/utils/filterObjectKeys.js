module.exports = function filterObjKeys(inputObj, keys) {
  return Object
    .keys(inputObj)
    .filter(key => keys.includes(key))
    .reduce((obj, key) => {
      // eslint-disable-next-line
      obj[key] = inputObj[key];
      return obj;
    }, {});
};
