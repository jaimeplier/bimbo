var FactoriesController = require ('./../controllers/FactoriesController.js');
var UsersController = require('./../controllers/UsersController.js');

var resWithValidationError = require('./../utils/resWithValidationError.js');
var resWithServerError = require('./../utils/resWithServerError.js');

var request = require('request');
var path = require('path');

var authM = UsersController.authMasterUser;

module.exports = function(app) {

  if(process.env.NODE_ENV === 'development') {
    app.get('/api/session', function(req, res) {
      res.json({err: false, session: req.session});
    });
  }

  app.post('/api/factories', FactoriesController.saveFactory);

  app.get('/api/users', UsersController.getAuthenticatedUser);
  app.get('/api/users/logout', UsersController.logout);
  app.post('/api/users/masters/create', UsersController.createMasterUser);
  app.post('/api/users/register', UsersController.registerUser);
  app.post('/api/users/log-in', UsersController.logInUser);


  app.get('/api/scores', authM, function(req, res, next) {
    request.get('http://bimbo.arvolution.com/api/scores', function(err, response, body) {
      res.json(JSON.parse(body));
    })
  });


  app.all('/api/*', function(req, res, next) {
    var err = res.locals && res.locals.err;
    if(err && err.name == 'ValidationError') return resWithValidationError(res, err);
    if(err) return resWithServerError(res, err);
    res.status(400).json({err: true, message: 'Route not found'});
  });

  app.get('/*', function(req, res, next) {
    res.sendFile(path.join(__dirname + './../../build', 'index.html'));
  })
}
