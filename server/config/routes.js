// TODO: Probably should divide the factories functions
// into their own controller instead of having them all
// on the factory controller. (e.g: /scores on the
// scores controller instead of factory controller)

const FactoriesController = require('./../controllers/FactoriesController.js');
const UsersController = require('./../controllers/UsersController.js');
const ScoresController = require('./../controllers/ScoreController.js');
const ActionPlansCtr = require('./../controllers/ActionPlansController.js');
const DashboardsController = require('./../controllers/DashboardsController.js');
const OrganizationsController = require('./../controllers/OrganizationsController.js');
const ProductsController = require('./../controllers/ProductsController.js');

const Errors = require('./../utils/errorResponses.js');

const path = require('path');

const authM = UsersController.authMasterUser;
const authA = UsersController.authAdminUser;
const authE = UsersController.authEmployeeUser;

module.exports = function routes(app) {
  if (process.env.NODE_ENV === 'development') {
    app.get('/api/session', (req, res) => {
      res.json({ err: false, session: req.session });
    });
  }


  // Users
  // ------------------------------------------------------
  app.get('/api/users', UsersController.getAuthenticatedUser);
  app.get('/api/users/logout', UsersController.logout);
  app.post('/api/users/masters/create', UsersController.createMasterUser);
  app.post('/api/users/register', UsersController.registerUser);
  app.post('/api/users/log-in', UsersController.logInUser);
  // app.post('/api/users/employee/create', authA, UsersController.createEmployeeUser);
  app.post('/api/users/employee/log-in', UsersController.authorizeEmployee);
  app.get('/api/users/language', UsersController.getLanguage);

  // Dashboards
  // ------------------------------------------------------
  app.get('/api/dashboards/global', authM, DashboardsController.global);

  // Factories
  // ------------------------------------------------------
  const FC = FactoriesController;
  app.get('/api/factories', authM, FC.getSlugs);
  app.get('/api/factories/:slug', authA, FC.getFactoryInfo);
  app.get('/api/factories/:slug/summary', authA, DashboardsController.factorySummary);
  app.get('/api/factories/:slug/employees', authA, FC.getEmployees);
  app.get('/api/factories/:slug/action-plans', authA, FC.getActionPlans);
  app.get('/api/factories/:slug/action-plans/download/:fileType', authA, FC.downloadActionPlans);
  app.get('/api/factories/:slug/scores/download/:fileType', authA, FC.downloadScores);
  app.get('/api/factories/:slug/scores', authA, ScoresController.getLatestScores);
  app.get('/api/factories/:slug/managers', authA, FC.getManagers);
  app.post('/api/factories/:slug/employees', authA, UsersController.createEmployee);
  app.post('/api/factories/:slug/managers', authA, UsersController.createManager);
  app.get('/api/factories/:slug/score-average', authM, ScoresController.getFactoryAverageScore);

  // Organizations
  // ------------------------------------------------------
  app.get('/api/organizations', authM, OrganizationsController.getOrganizations);
  app.get('/api/organizations/:slug/products', authM, ProductsController.getProductsByOrganization);

  // Scores
  // ------------------------------------------------------
  app.get('/api/factories/:slug/score', authA, ScoresController.getScore);
  app.post('/api/products/:product/scoring', authE, ScoresController.createScores);


  // Action Plans
  // ------------------------------------------------------
  app.get('/api/action-plans', ActionPlansCtr.get);
  app.post('/api/action-plans/complete', ActionPlansCtr.complete);

  // Compare Factories
  // ------------------------------------------------------
  app.get('/api/compare', authM, ScoresController.getFactoriesCompare);

  // Error Handling
  // ------------------------------------------------------

  app.all('/api/*', (req, res) => {
    const err = res.locals && res.locals.err;
    if (err && err.name === 'SequelizeValidationError') return Errors.resWithValidationError(req, res, err);
    if (err && err.name === 'General') return Errors.resWithGeneralError(req, res, err);
    if (err) return Errors.resWithServerError(req, res, err);
    res.status(404).json({ err: true, message: 'Route not found' });
  });

  app.get('/*', (req, res) => {
    res.sendFile(path.join(`${__dirname}./../../build`, 'index.html'));
  });
};
