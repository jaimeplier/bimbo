module.exports = function routeErr(res, next, err) {
  if (res) res.locals.err = err || { err: true };
  if (next) next();
};
