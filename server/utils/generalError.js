var routeErr = require('./routeErr.js');

module.exports = function(res, next, msg) {
  return routeErr(res, next, {name: 'General', message: msg});
}
