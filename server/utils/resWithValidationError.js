module.exports = function(res, err) {
  var response = {errors: {}};
  for(var field in err.errors) {
    response.errors[field] = err.errors[field].message;
  }
  res.json({err: true, name: err.name, errors: response.errors});
}
