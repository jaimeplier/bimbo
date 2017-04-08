var FactoriesController = require ("./../controllers/FactoriesController.js");
var UsersController = require("./../controllers/UsersController.js");

var resWithValidationError = require('./../utils/resWithValidationError.js');
var resWithServerError = require('./../utils/resWithServerError.js');

module.exports = function(app) {

  app.get('/api/test', function(req, res) {
    res.json({
      ok: true
    })
  })

  app.post('/api/factories', FactoriesController.saveFactory);

  app.post('/api/users/masters/create', UsersController.createMasterUser);
  app.post('/api/users/sign-in', UsersController.signInUser);
  app.post('/api/users/log-in', UsersController.logInUser);

  app.get("/api/session", function(req, res, next) {
    res.json({err: false, session: req.session});
  });


  app.all('/api/*', function(req, res, next) {
    var err = res.locals && res.locals.err;
    if(err && err.name == "ValidationError") return resWithValidationError(res, err);
    if(err) return resWithServerError(res, err);
    res.status(400).json({err: true, message: "Route not found"});
  });
}
