var FactoriesController = require ('./../controllers/FactoriesController.js');
var UsersController = require('./../controllers/UsersController.js');
var ScoresController = require('./../controllers/ScoreController.js');
var ActionPlansCtr = require('./../controllers/ActionPlansController.js');
var DashboardsController = require('./../controllers/DashboardsController.js');

var Errors = require('./../utils/errorResponses.js');

var request = require('request');
var path = require('path');

var authM = UsersController.authMasterUser;
var authA = UsersController.authAdminUser;
var authE = UsersController.authEmployeeUser;

module.exports = function(app) {

  if(process.env.NODE_ENV === 'development') {
    app.get('/api/session', function(req, res) {
      res.json({err: false, session: req.session});
    });
  }


  // Users
  // ------------------------------------------------------
  app.get('/api/users', UsersController.getAuthenticatedUser);
  app.get('/api/users/logout', UsersController.logout);
  app.post('/api/users/masters/create', UsersController.createMasterUser);
  app.post('/api/users/register', UsersController.registerUser);
  app.post('/api/users/log-in', UsersController.logInUser);
  app.post('/api/users/employee/create', authA, UsersController.createEmployeeUser);
  app.post('/api/users/employee/log-in', UsersController.authorizeEmployee);
  app.get('/api/users/language', UsersController.getLanguage);


  // Factories
  // ------------------------------------------------------
  const FC = FactoriesController;
  app.get('/api/dashboards/global', authM, DashboardsController.global);
  app.get('/api/factories', authM, FC.getSlugs);
  app.get('/api/factories/:slug', authA, FC.getFactoryInfo)
  app.get('/api/factories/:slug/employees', authA, FC.getEmployees)
  app.get('/api/factories/:slug/action-plans', authA, FC.getActionPlans)


  // Scores
  // ------------------------------------------------------
  app.post('/api/scores/:product', authE, ScoresController.create)
  app.get('/api/scores/', authM, ScoresController.get)
  app.get('/api/scores/download', authM, ScoresController.downloadScores)


  // Action Plans
  // ------------------------------------------------------
  app.get('/api/action-plans', ActionPlansCtr.get);
  app.post('/api/action-plans/complete', ActionPlansCtr.complete)
  app.get('/api/action-plans/download', authM, ActionPlansCtr.downloadActionPlans)


  // Error Handling
  // ------------------------------------------------------
  
  app.all('/api/*', function(req, res, next) {
    var err = res.locals && res.locals.err;
    if(err && err.name == 'SequelizeValidationError') return Errors.resWithValidationError(req, res, err);
    if(err && err.name == 'General') return Errors.resWithGeneralError(req, res, err);
    if(err) return Errors.resWithServerError(req, res, err);
    res.status(404).json({err: true, message: 'Route not found'});
  });

  app.get('/*', function(req, res, next) {
    res.sendFile(path.join(__dirname + './../../build', 'index.html'));
  })

}

