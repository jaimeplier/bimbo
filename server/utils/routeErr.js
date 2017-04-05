module.exports = function(res, next, err) {
  res.locals.err = err ? err : {err: true};
  next();
}
