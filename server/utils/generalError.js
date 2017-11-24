// Used to show a general
const routeErr = require('./routeErr.js');

module.exports = function generalError(res, next, msg) {
  return routeErr(res, next, { name: 'General', message: msg });
};
