module.exports = function(res, next, err) {
  if(res) res.locals.err = err ? err : {err: true};
  if(next) next();
}
