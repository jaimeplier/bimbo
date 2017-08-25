var getTranslation = require('../utils/getTranslation.js');

function resWithValidationError(req, res, err) {
  var response = {err: true, name: 'ValidationError', errors: {}};
  err.errors.map((e) => {
    response.errors[e.path] = getTranslation(req, e.message)
  })
  if(process.env.NODE_ENV == 'development') response.debug = err;
  res.status(422).json(response);
}

function resWithServerError(req, res, err) {
  res.status(err.status || 500).json({
    err: err && process.env.NODE_ENV == "development" ? err : true,
    message: getTranslation(req, (err && err.message) || 'serverError')
  });
}

function resWithGeneralError(req, res, err) {
  res.status(422).json({
    err: true,
    errors: {general: getTranslation(req, err.message)}
  });
}

module.exports = {
  resWithValidationError,
  resWithServerError,
  resWithGeneralError,
}
