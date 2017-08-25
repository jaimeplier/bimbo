module.exports = function(res, err) {
  var response = {err: true, name: 'ValidationError', errors: {}};
  err.errors.map((e) => {
    response.errors[e.path] = e.message;
  })
  if(process.env.NODE_ENV == 'development') response.debug = err;
  res.status(422).json(response);
}
